import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for development
  const mockValidators = [
    {
      id: "validator-1",
      name: "Ping Validator Alpha",
      address: "8xDrJzFZR7KLCCgEPT5kX9qM9TZ5XVsJQX3LUKiVD9ww",
      status: "online",
      uptime: 99.8,
      delegated: 5000,
      apy: "8.5%",
      lastSeen: new Date().toISOString(),
      version: "1.0.0"
    },
    {
      id: "validator-2",
      name: "Ping Validator Beta",
      address: "6YR1MrHzQxHgGnrJXMQT8LQYAaJaxy9P3uRrHVx9QUya",
      status: "online",
      uptime: 98.2,
      delegated: 3500,
      apy: "8.2%",
      lastSeen: new Date().toISOString(),
      version: "1.0.0"
    },
    {
      id: "validator-3",
      name: "Ping Validator Gamma",
      address: "4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM",
      status: "degraded",
      uptime: 92.5,
      delegated: 2000,
      apy: "7.8%",
      lastSeen: new Date().toISOString(),
      version: "1.0.0"
    },
    {
      id: "validator-4",
      name: "Ping Validator Delta",
      address: "CiDwVBFgWV9E5MvXWoLgnEgn2hK7rJikbvfWavzAQz3",
      status: "offline",
      uptime: 45.3,
      delegated: 1000,
      apy: "7.5%",
      lastSeen: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      version: "0.9.8"
    }
  ];
  
  // Add a small delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(mockValidators);
} 