use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::net::IpAddr;
use std::path::Path;
use std::fs;
use std::env;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidatorConfig {
    pub server: ServerConfig,
    pub solana: SolanaConfig,
    pub validator: ValidatorDetails,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
    pub log_level: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SolanaConfig {
    pub rpc_url: String,
    pub ws_url: String,
    pub voter_key: String,
    pub operator_key: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidatorDetails {
    pub name: String,
    pub version: String,
    pub operator_address: String,
    pub voter_address: String,
    pub vault_ticket: String,
    pub delegation: String,
}

impl Default for ValidatorConfig {
    fn default() -> Self {
        Self {
            server: ServerConfig {
                host: "127.0.0.1".to_string(),
                port: 8080,
                log_level: "info".to_string(),
            },
            solana: SolanaConfig {
                rpc_url: "https://api.devnet.solana.com".to_string(),
                ws_url: "wss://api.devnet.solana.com".to_string(),
                voter_key: "".to_string(),
                operator_key: "".to_string(),
            },
            validator: ValidatorDetails {
                name: "Ping Validator".to_string(),
                version: env!("CARGO_PKG_VERSION").to_string(),
                operator_address: "DFTHqW9Mf2ATCbSVKNtFdr1QhZRX4KmEPHfZgzsDdPkm".to_string(),
                voter_address: "36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y".to_string(),
                vault_ticket: "C7Gm8vETLnD3EUmop24sLariNsxAdFXCLMhpMuUT79RH".to_string(),
                delegation: "5avZvL4tjTJVjz4KcHLJayVEBKJ2TEjEMzyqvteFRxkz".to_string(),
            },
        }
    }
}

impl ValidatorConfig {
    pub fn new() -> Result<Self> {
        let config_path = env::var("CONFIG_PATH").unwrap_or_else(|_| "config/default.json".to_string());
        Self::from_file(&config_path)
    }

    pub fn from_file<P: AsRef<Path>>(path: P) -> Result<Self> {
        let config = if path.as_ref().exists() {
            let config_text = fs::read_to_string(path)?;
            serde_json::from_str(&config_text)?
        } else {
            Self::default()
        };
        
        Ok(config)
    }

    pub fn override_from_env(&mut self) {
        if let Ok(host) = env::var("SERVER_HOST") {
            self.server.host = host;
        }
        
        if let Ok(port) = env::var("SERVER_PORT") {
            if let Ok(port) = port.parse::<u16>() {
                self.server.port = port;
            }
        }
        
        if let Ok(log_level) = env::var("LOG_LEVEL") {
            self.server.log_level = log_level;
        }
        
        if let Ok(rpc_url) = env::var("SOLANA_RPC_URL") {
            self.solana.rpc_url = rpc_url;
        }
        
        if let Ok(ws_url) = env::var("SOLANA_WS_URL") {
            self.solana.ws_url = ws_url;
        }
        
        if let Ok(voter_key) = env::var("VOTER_KEY") {
            self.solana.voter_key = voter_key;
        }
        
        if let Ok(operator_key) = env::var("OPERATOR_KEY") {
            self.solana.operator_key = operator_key;
        }
        
        if let Ok(name) = env::var("VALIDATOR_NAME") {
            self.validator.name = name;
        }
    }
} 