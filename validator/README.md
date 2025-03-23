# Ping Validator

A Rust-based validator service for the Ping Network that connects to Solana blockchain and provides status monitoring capabilities.

## Documentation

For detailed instructions on how to install, configure, and run the validator, please see the [Validator Operator Guide](validator.md).

## Features

- Connects to Solana blockchain to retrieve network status
- Monitors Ping Network node statuses
- Exposes RESTful API endpoints for status retrieval
- Configurable through environment variables or config file

## Quick Start

```bash
# Build the validator
cargo build --release

# Create configuration
mkdir -p config
cp config.example.json config/default.json
# Edit config/default.json with your specific settings

# Run the validator
./target/release/ping-validator
```

## License

Apache License 2.0

