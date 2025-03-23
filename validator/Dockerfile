FROM rust:latest as builder

WORKDIR /app

# Copy the Cargo.toml and Cargo.lock files
COPY Cargo.toml ./

# Create dummy source file to build dependencies
RUN mkdir src && \
    echo "fn main() {println!(\"if you see this, the build broke\")}" > src/main.rs && \
    echo "pub fn dummy() {}" > src/lib.rs

# Build dependencies - this will be cached unless Cargo.toml changes
RUN cargo build --release

# Remove the dummy source files and compiled files
RUN rm -rf src target/release/deps/ping_validator*

# Copy the actual source code
COPY . .

# Build the application
RUN cargo build --release

# Create a smaller runtime image
FROM debian:bullseye-slim

# Install necessary runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    libssl1.1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /app/target/release/ping-validator /app/ping-validator

# Copy configuration
COPY --from=builder /app/config /app/config

# Expose the API port
EXPOSE 8080

# Set environment variables
ENV RUST_LOG=info
ENV CONFIG_PATH=/app/config/default.json

# Run the binary
CMD ["/app/ping-validator"] 