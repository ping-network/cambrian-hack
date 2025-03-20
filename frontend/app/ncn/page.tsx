"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Database, Server, Zap, Shield, AlertCircle } from "lucide-react"
import { DataTable } from "../components/data-table"
import { columns } from "./columns"
import { useJitoValidators } from "../hooks/useJitoValidators"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NCNPage() {
  const { validators, vaultStats, isLoading, error } = useJitoValidators();

  // Stats cards based on vault data
  const stats = [
    { title: "Active Validators", value: vaultStats?.totalValidators.toString() || "1", icon: Server },
    { title: "Total Staked", value: vaultStats?.totalStaked || "1,000 PING", icon: Database },
    { title: "Average APY", value: vaultStats?.averageAPY || "8.2%", icon: Clock },
    { title: "Network Status", value: "Active", icon: Zap },
  ];

  // Handle loading and error states
  if (isLoading) {
    return (
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Node Consensus Network</h1>
        <p className="text-muted-foreground">
          The Node Consensus Network (NCN) is the backbone of the Ping Network, consisting of validators that secure the network through the Jito Restaking protocol.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Node Consensus Network</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load validator data: {error}
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  // Transform validator data for the table
  const tableData = validators.map(validator => ({
    id: validator.id,
    name: validator.name,
    address: validator.address,
    voter: validator.voter,
    stake: validator.stake,
    lastVote: validator.lastVote,
    status: validator.status
  }));

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Node Consensus Network</h1>
      <p className="text-muted-foreground">
        The Node Consensus Network (NCN) is the backbone of the Ping Network, consisting of validators that secure the network through the Jito Restaking protocol.
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Validators</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={tableData} />
        </CardContent>
      </Card>
      
      {validators.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <Shield className="h-12 w-12 text-blue-500" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">Validator Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Operator Address</p>
                    <p className="text-sm font-mono break-all">{validators[0].address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Voter Address</p>
                    <p className="text-sm font-mono break-all">{validators[0].voter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delegation</p>
                    <p className="text-sm">Vault Operator Delegation: {validators[0].vaultOperatorDelegation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vault Ticket</p>
                    <p className="text-sm">Operator Vault Ticket: {validators[0].operatorVaultTicket}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  )
}

