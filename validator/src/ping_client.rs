use actix_web::{get, web, HttpResponse, Responder};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::time::Duration;
use log::{info, error};
use crate::config::ValidatorConfig;

const REQUEST_TIMEOUT: u64 = 10; // seconds

/// Node status from Ping backend
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NodeStatus {
    #[serde(rename = "id")]
    pub node_id: String,
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub ip_address: Option<String>,
    #[serde(default)]
    pub location: Option<String>,
    pub status: String,
    #[serde(default)]
    pub last_seen: Option<String>,
    #[serde(default)]
    pub uptime: Option<f64>,
    #[serde(default)]
    pub epoch: Option<u64>,
    #[serde(default)]
    pub slot: Option<u64>,
    #[serde(flatten)]
    pub additional: std::collections::HashMap<String, serde_json::Value>,
}

/// Response wrapper for node statuses list
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NodesListResponse {
    pub nodes: Vec<NodeStatus>,
    pub total: usize,
    pub timestamp: String,
}

/// Query parameters for filtering nodes
#[derive(Debug, Deserialize)]
pub struct NodeFilterParams {
    pub node_id: Option<String>,
    pub status: Option<String>,
    pub limit: Option<usize>,
}

/// Ping API client
#[derive(Clone)]
pub struct PingClient {
    client: Client,
    base_url: String,
}

impl PingClient {
    pub fn new(config: &ValidatorConfig) -> Self {
        let client = Client::builder()
            .timeout(Duration::from_secs(REQUEST_TIMEOUT))
            .build()
            .expect("Failed to create HTTP client");

        Self {
            client,
            base_url: config.ping.api_url.clone(),
        }
    }

    /// Get statuses of all nodes from Ping backend
    pub async fn get_node_statuses(&self) -> Result<Vec<NodeStatus>, String> {
        let url = format!("{}/nodes", self.base_url);
        info!("Fetching node statuses from {}", url);
        
        let response = match self.client.get(&url).send().await {
            Ok(res) => res,
            Err(e) => {
                let error_msg = format!("Request error: {}", e);
                error!("{}", error_msg);
                return Err(error_msg);
            }
        };
        
        // Check if the response has an error status
        if !response.status().is_success() {
            let error_msg = format!("HTTP error: {}", response.status());
            error!("Failed to get node statuses: {}", error_msg);
            return Err(error_msg);
        }
        
        // Log the raw response for debugging
        if let Ok(text) = response.text().await {
            info!("Raw API response: {}", text);
            
            // Try to parse the response as an array of NodeStatus
            match serde_json::from_str::<Vec<NodeStatus>>(&text) {
                Ok(nodes) => {
                    info!("Successfully fetched {} node statuses", nodes.len());
                    return Ok(nodes);
                },
                Err(e) => {
                    let error_msg = format!("JSON parse error: {} - Response was: {}", e, text);
                    error!("{}", error_msg);
                    return Err(error_msg);
                }
            }
        } else {
            return Err("Failed to get response text".to_string());
        }
    }
    
    /// Get a specific node status by ID
    pub async fn get_node_status(&self, node_id: &str) -> Result<NodeStatus, String> {
        let url = format!("{}/nodes/{}", self.base_url, node_id);
        info!("Fetching node status for ID: {} from {}", node_id, url);
        
        let response = match self.client.get(&url).send().await {
            Ok(res) => res,
            Err(e) => {
                let error_msg = format!("Request error: {}", e);
                error!("{}", error_msg);
                return Err(error_msg);
            }
        };
        
        // Check if the response has an error status
        if !response.status().is_success() {
            let error_msg = format!("HTTP error: {}", response.status());
            error!("Failed to get node status: {}", error_msg);
            return Err(error_msg);
        }
        
        // Log the raw response for debugging
        if let Ok(text) = response.text().await {
            info!("Raw API response: {}", text);
            
            // Try to parse the response as a single NodeStatus
            match serde_json::from_str::<NodeStatus>(&text) {
                Ok(node) => {
                    info!("Successfully fetched status for node {}", node_id);
                    return Ok(node);
                },
                Err(e) => {
                    let error_msg = format!("JSON parse error: {} - Response was: {}", e, text);
                    error!("{}", error_msg);
                    return Err(error_msg);
                }
            }
        } else {
            return Err("Failed to get response text".to_string());
        }
    }
}

/// Handler for getting all node statuses from Ping backend
#[get("/nodes")]
pub async fn get_node_statuses(
    ping_client: web::Data<PingClient>,
    query: web::Query<NodeFilterParams>,
) -> impl Responder {
    // Get the nodes (either all nodes or a specific one)
    let nodes_result = if let Some(node_id) = &query.node_id {
        // Get a specific node by ID
        match ping_client.get_node_status(node_id).await {
            Ok(node) => Ok(vec![node]),
            Err(e) => Err(e),
        }
    } else {
        // Get all nodes
        ping_client.get_node_statuses().await
    };
    
    // Process the result
    match nodes_result {
        Ok(mut nodes) => {
            // Apply filters if provided
            if let Some(status_filter) = &query.status {
                nodes.retain(|node| {
                    node.status.to_lowercase() == status_filter.to_lowercase()
                });
            }
            
            // Apply limit if provided
            if let Some(limit) = query.limit {
                if limit < nodes.len() {
                    nodes.truncate(limit);
                }
            }
            
            let total = nodes.len();
            
            // Wrap in a consistent response format
            let response = NodesListResponse {
                nodes,
                total,
                timestamp: chrono::Utc::now().to_rfc3339(),
            };
            
            HttpResponse::Ok().json(response)
        },
        Err(e) => {
            let error_type = if e.contains("node status") {
                "Failed to fetch node status"
            } else {
                "Failed to fetch node statuses"
            };
            
            error!("Error fetching nodes: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": error_type,
                "message": e,
            }))
        }
    }
}

/// Handler for getting a specific node status by ID
#[get("/nodes/{node_id}")]
pub async fn get_node_status_by_id(
    ping_client: web::Data<PingClient>,
    path: web::Path<String>,
) -> impl Responder {
    let node_id = path.into_inner();
    
    match ping_client.get_node_status(&node_id).await {
        Ok(node) => {
            // Wrap in a consistent response format
            let response = NodesListResponse {
                nodes: vec![node],
                total: 1,
                timestamp: chrono::Utc::now().to_rfc3339(),
            };
            
            HttpResponse::Ok().json(response)
        },
        Err(e) => {
            error!("Error fetching node status for {}: {}", node_id, e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch node status",
                "message": e,
            }))
        }
    }
} 