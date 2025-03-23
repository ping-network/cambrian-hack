# Ping Validator Operator

This document provides step-by-step instructions for setting up and running a Ping Validator operator.

## Overview

The Ping Validator operator is a service that:
- Communicates with the Solana blockchain
- Monitors node statuses from the Ping Network
- Exposes API endpoints for retrieving validator and node statuses

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (1.70.0 or newer)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) (included with Rust)
- [Git](https://git-scm.com/downloads)
- Basic knowledge of command-line operations

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/pingnetwork/ping-validator.git
cd ping-validator
```

### 2. Build the Validator

```bash
cargo build --release
```

This will compile the validator in release mode for optimal performance.

## Configuration

The validator requires a configuration file to operate correctly. By default, it looks for a file at `config/default.json`.

### Create Configuration Directory

```bash
mkdir -p config
```

### Create Configuration File

Create a file named `config/default.json` with the following content:

```json
{
  "server": {
    "host": "127.0.0.1",
    "port": 8081,
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
    "operator_address": "<YOUR_OPERATOR_ADDRESS>",
    "voter_address": "<YOUR_VOTER_ADDRESS>",
    "vault_ticket": "<YOUR_VAULT_TICKET>",
    "delegation": "<YOUR_DELEGATION_ADDRESS>"
  },
  "ping": {
    "api_url": "https://api.pingnet.org/validator/v1"
  }
}
```

Replace the placeholder values with your actual keys and addresses.

### Configuration Options

| Parameter | Description |
|-----------|-------------|
| `server.host` | IP address to bind the server to (use `0.0.0.0` to listen on all interfaces) |
| `server.port` | Port number to listen on |
| `server.log_level` | Logging level (`debug`, `info`, `warn`, `error`) |
| `solana.rpc_url` | URL of the Solana RPC endpoint |
| `solana.ws_url` | WebSocket URL of the Solana endpoint |
| `solana.voter_key` | Your validator's voting key (optional) |
| `solana.operator_key` | Your operator key (optional) |
| `validator.name` | Name of your validator |
| `validator.operator_address` | Operator address on Solana |
| `validator.voter_address` | Voter address on Solana |
| `validator.vault_ticket` | Vault ticket address |
| `validator.delegation` | Delegation address |
| `ping.api_url` | URL of the Ping Network API |

### Environment Variables

You can override any configuration option using environment variables:

- `SERVER_HOST` - Override server host
- `SERVER_PORT` - Override server port
- `LOG_LEVEL` - Override log level
- `SOLANA_RPC_URL` - Override Solana RPC URL
- `SOLANA_WS_URL` - Override Solana WebSocket URL
- `VOTER_KEY` - Override voter key
- `OPERATOR_KEY` - Override operator key
- `VALIDATOR_NAME` - Override validator name
- `PING_API_URL` - Override Ping API URL

## Running the Validator

### Start in Development Mode

```bash
cargo run
```

### Start in Production Mode

```bash
./target/release/ping-validator
```

You should see output similar to:
```
[2025-03-23T09:50:09Z INFO ping_validator] Starting Ping Validator on 127.0.0.1:8081
[2025-03-23T09:50:09Z INFO actix_server::builder] starting 8 workers
[2025-03-23T09:50:09Z INFO actix_server::server] Actix runtime found; starting in Actix runtime
[2025-03-23T09:50:10Z INFO ping_validator::status] Updated validator status: connected to Solana at epoch 854 slot 369264773
```

This indicates that the validator is running correctly and has connected to the Solana network.

## API Endpoints

The validator exposes the following API endpoints:

### Get Validator Status

```
GET /api/v1/status
```

Returns the current status of the validator, including Solana connection status.

### Get All Node Statuses

```
GET /api/v1/nodes
```

Returns statuses of all nodes in the Ping network.

Query parameters:
- `node_id` (optional) - Filter by node ID
- `status` (optional) - Filter by status (e.g., "active", "retiring")
- `limit` (optional) - Limit the number of results

### Get Specific Node Status

```
GET /api/v1/nodes/{node_id}
```

Returns the status of a specific node.

## Troubleshooting

### Port Already in Use

If you see an error like `Address already in use`, change the port in your configuration file.

### Solana Connection Issues

If the validator cannot connect to Solana, check:
1. Your internet connection
2. The `solana.rpc_url` in your configuration
3. Whether the Solana network is experiencing issues

### Runtime Panic

If you see an error related to `tokio::task::spawn_blocking`, ensure you're using a multi-threaded runtime by running with:

```bash
TOKIO_WORKER_THREADS=4 ./target/release/ping-validator
```

## Contributing

Contributions are welcome! Please see the repository's CONTRIBUTING.md file for details.

## License

This project is licensed under the terms of the Apache License 2.0. See the LICENSE file for details. 