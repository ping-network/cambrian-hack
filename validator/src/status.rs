use crate::config::ValidatorConfig;
use actix_web::{get, web, HttpResponse, Responder};
use chrono::{DateTime, Utc};
use local_ip_address::local_ip;
use serde::{Deserialize, Serialize};
use solana_client::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;
use std::sync::{Arc, RwLock};
use std::time::{Duration, SystemTime};
use log::{info, error};

/// Last checked status of the Solana connection
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum SolanaStatus {
    Connected,
    Disconnected { reason: String },
    Unknown,
}

/// Validator status model
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidatorStatus {
    pub name: String,
    pub version: String,
    pub uptime: Duration,
    pub ip_address: String,
    pub started_at: DateTime<Utc>,
    pub operator_address: String,
    pub voter_address: String,
    pub vault_ticket: String,
    pub delegation: String,
    pub solana_status: SolanaStatus,
    pub epoch: Option<u64>,
    pub slot: Option<u64>,
    pub last_vote: Option<DateTime<Utc>>,
}

/// Status service that tracks the validator's status
#[derive(Clone)]
pub struct StatusService {
    config: ValidatorConfig,
    status: Arc<RwLock<ValidatorStatus>>,
    start_time: SystemTime,
}

impl StatusService {
    pub fn new(config: ValidatorConfig) -> Self {
        let ip = match local_ip() {
            Ok(ip) => ip.to_string(),
            Err(e) => {
                error!("Failed to get local IP: {}", e);
                "unknown".to_string()
            }
        };
        
        let start_time = SystemTime::now();
        let started_at = DateTime::<Utc>::from(start_time);
        
        let status = ValidatorStatus {
            name: config.validator.name.clone(),
            version: config.validator.version.clone(),
            uptime: Duration::from_secs(0),
            ip_address: ip,
            started_at,
            operator_address: config.validator.operator_address.clone(),
            voter_address: config.validator.voter_address.clone(),
            vault_ticket: config.validator.vault_ticket.clone(),
            delegation: config.validator.delegation.clone(),
            solana_status: SolanaStatus::Unknown,
            epoch: None,
            slot: None,
            last_vote: None,
        };
        
        Self {
            config,
            status: Arc::new(RwLock::new(status)),
            start_time,
        }
    }
    
    /// Updates the validator status with the latest information
    pub async fn update_status(&self) {
        // Update uptime
        let uptime = SystemTime::now()
            .duration_since(self.start_time)
            .unwrap_or(Duration::from_secs(0));
            
        // Update uptime immediately without holding the lock during the RPC call
        {
            let mut status = self.status.write().unwrap();
            status.uptime = uptime;
        } // RwLockWriteGuard is dropped here
        
        // Use a clone of the config for the blocking task
        let rpc_url = self.config.solana.rpc_url.clone();
        
        // Execute Solana RPC call in a blocking task to avoid runtime panic
        let epoch_result = tokio::task::spawn_blocking(move || {
            let rpc_client = RpcClient::new_with_commitment(
                rpc_url,
                CommitmentConfig::confirmed(),
            );
            rpc_client.get_epoch_info()
        }).await;
        
        // Now update the status with the results
        let mut status = self.status.write().unwrap();
        
        match epoch_result {
            Ok(Ok(epoch_info)) => {
                status.solana_status = SolanaStatus::Connected;
                status.epoch = Some(epoch_info.epoch);
                status.slot = Some(epoch_info.absolute_slot);
                
                // In a real implementation, you would get the last vote information
                // from the validator's vote account. For this example, we'll use current time.
                status.last_vote = Some(Utc::now());
                
                info!("Updated validator status: connected to Solana at epoch {} slot {}", 
                      epoch_info.epoch, epoch_info.absolute_slot);
            },
            Ok(Err(e)) => {
                status.solana_status = SolanaStatus::Disconnected { 
                    reason: e.to_string() 
                };
                error!("Failed to connect to Solana: {}", e);
            },
            Err(e) => {
                status.solana_status = SolanaStatus::Disconnected { 
                    reason: format!("Task error: {}", e) 
                };
                error!("Task error when connecting to Solana: {}", e);
            }
        }
    }
    
    /// Get a clone of the current validator status
    pub fn get_status(&self) -> ValidatorStatus {
        self.status.read().unwrap().clone()
    }
}

/// Returns the current validator status as JSON
#[get("/status")]
pub async fn get_status(status_service: web::Data<StatusService>) -> impl Responder {
    let status = status_service.get_status();
    HttpResponse::Ok().json(status)
}

/// Factory function for the web Data<StatusService>
pub fn get_status_service(config: ValidatorConfig) -> web::Data<StatusService> {
    let service = StatusService::new(config);
    let service_clone = service.clone();
    
    // Update status once initially and start background task
    tokio::spawn(async move {
        service_clone.update_status().await;
        
        // Start background task to update status periodically
        let mut interval = tokio::time::interval(Duration::from_secs(30));
        loop {
            interval.tick().await;
            service_clone.update_status().await;
        }
    });
    
    web::Data::new(service)
} 