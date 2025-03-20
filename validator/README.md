# Ping Validator

A Rust implementation of the Ping Validator for the Cambrian Platform integration. This validator provides a status endpoint to report its current status, including IP address and Solana connection details.

## Features

- **Status Endpoint**: HTTP endpoint at `/api/v1/status` providing real-time information about the validator
- **Solana Integration**: Connects to Solana blockchain to report current epoch and slot information
- **IP Reporting**: Automatically detects and reports the validator's IP address
- **Configuration**: Supports configuration via JSON files and environment variables
- **Docker Support**: Includes Dockerfile and docker-compose.yml for easy deployment

## Building and Running Locally

### Prerequisites

- Rust (1.68.0 or later)
- Cargo (comes with Rust)
- Solana CLI Tools (1.16.0 or later)

### Building

```bash
# Clone the repository (if you haven't already)
git clone https://github.com/ping-network/cambrian-hack.git
cd cambrian-hack/validator

# Build the validator
cargo build --release
```

### Running

```bash
# Run the validator with default settings
cargo run --release

# Or specify a custom configuration file
CONFIG_PATH=./config/custom.json cargo run --release
```

## Configuration

The validator can be configured using a JSON configuration file or environment variables.

### Configuration File

Default configuration is loaded from `config/default.json`. You can create a custom configuration file using the following format:

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "log_level": "info"
  },
  "solana": {
    "rpc_url": "https://api.devnet.solana.com",
    "ws_url": "wss://api.devnet.solana.com",
    "voter_key": "",
    "operator_key": ""
  },
  "validator": {
    "name": "Ping Validator",
    "version": "0.1.0",
    "operator_address": "DFTHqW9Mf2ATCbSVKNtFdr1QhZRX4KmEPHfZgzsDdPkm",
    "voter_address": "36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y",
    "vault_ticket": "C7Gm8vETLnD3EUmop24sLariNsxAdFXCLMhpMuUT79RH",
    "delegation": "5avZvL4tjTJVjz4KcHLJayVEBKJ2TEjEMzyqvteFRxkz"
  }
}
```

### Environment Variables

The following environment variables can be used to override the configuration:

- `SERVER_HOST`: Host to bind the server to (default: "127.0.0.1")
- `SERVER_PORT`: Port to bind the server to (default: 8080)
- `LOG_LEVEL`: Log level (default: "info")
- `SOLANA_RPC_URL`: Solana RPC URL (default: "https://api.devnet.solana.com")
- `SOLANA_WS_URL`: Solana WebSocket URL (default: "wss://api.devnet.solana.com")
- `VOTER_KEY`: Voter private key (default: empty)
- `OPERATOR_KEY`: Operator private key (default: empty)
- `VALIDATOR_NAME`: Custom validator name (default: "Ping Validator")
- `CONFIG_PATH`: Path to the configuration file (default: "config/default.json")

## Docker Deployment

### Building and Running with Docker

```bash
# Build the Docker image
docker build -t ping-validator .

# Run the Docker container
docker run -p 8080:8080 ping-validator
```

### Running with Docker Compose

```bash
# Start the validator and Cambrian operator
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the services
docker-compose down
```

## API Endpoints

### Status Endpoint

```
GET /api/v1/status
```

Example response:

```json
{
  "name": "Ping Validator",
  "version": "0.1.0",
  "uptime": "PT1H30M45S",
  "ip_address": "192.168.1.100",
  "started_at": "2025-02-10T12:34:56Z",
  "operator_address": "DFTHqW9Mf2ATCbSVKNtFdr1QhZRX4KmEPHfZgzsDdPkm",
  "voter_address": "36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y",
  "vault_ticket": "C7Gm8vETLnD3EUmop24sLariNsxAdFXCLMhpMuUT79RH",
  "delegation": "5avZvL4tjTJVjz4KcHLJayVEBKJ2TEjEMzyqvteFRxkz",
  "solana_status": "Connected",
  "epoch": 123,
  "slot": 45678901,
  "last_vote": "2025-02-10T14:05:32Z"
}
```

