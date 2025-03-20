mod config;
mod status;

use actix_web::{App, HttpServer, middleware, web};
use log::{info, error};
use std::net::SocketAddr;

use crate::config::ValidatorConfig;
use crate::status::{get_status, get_status_service};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize logger
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    
    // Load configuration
    let mut config = match ValidatorConfig::new() {
        Ok(config) => config,
        Err(e) => {
            error!("Failed to load configuration: {}", e);
            ValidatorConfig::default()
        }
    };
    
    // Override config from environment variables
    config.override_from_env();
    
    // Get server address
    let server_addr = format!("{}:{}", config.server.host, config.server.port);
    let socket_addr: SocketAddr = server_addr.parse()
        .expect("Invalid server address configuration");
    
    info!("Starting Ping Validator on {}", server_addr);
    
    // Create status service
    let status_service = get_status_service(config.clone());
    
    // Start HTTP server
    HttpServer::new(move || {
        App::new()
            .app_data(status_service.clone())
            .wrap(middleware::Logger::default())
            .service(
                web::scope("/api/v1")
                    .service(get_status)
            )
    })
    .bind(socket_addr)?
    .run()
    .await
} 