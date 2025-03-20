"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Globe, Server } from "lucide-react"
import { DataTable } from "./data-table"
import { columns, TableNode } from "./columns"
import { NodeResponse } from "@/types/nodes"

interface ExplorerContentProps {
  initialData: NodeResponse;
}

export function ExplorerContent({ initialData }: ExplorerContentProps) {
  // console.log(initialData);

  const { nodes = [], error } = initialData;
  const activeNodes = nodes.filter(node => node.status === 'active');
  
  const stats = [
    { title: "Total Nodes", value: nodes.length.toString(), icon: Server },
    { title: "Active Nodes", value: activeNodes.length.toString(), icon: Activity },
    { title: "Network Uptime", value: "99.9999%", icon: Globe }, // This could be calculated from node data if available
  ]

  // Transform nodes data to match the table structure
  const tableData: TableNode[] = nodes.map(node => ({
    id: node.id,
    name: `${node.external_id}`,
    status: node.status === 'active' ? 'Online' : 'Offline',
    uptime: "99.9999%", // This could be calculated from node data if available
  }));

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Network Explorer</h1>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Network Explorer</h1>
      <div className="grid gap-4 md:grid-cols-3">
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
          <CardTitle>Public Nodes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={tableData} />
        </CardContent>
      </Card>
    </div>
  );
} 