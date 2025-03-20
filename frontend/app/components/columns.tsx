"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

// This type should match the transformed data structure
export type TableNode = {
  id: string
  name: string
  status: "Online" | "Offline"
  uptime: string
}

export const columns: ColumnDef<TableNode>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant={status === "Online" ? "default" : "destructive"}>{status}</Badge>
    },
  },
  {
    id: "uptime",
    accessorKey: "uptime",
    header: "Uptime",
  },
]

