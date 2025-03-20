"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

export type Validator = {
  id: string
  name: string
  address?: string
  voter?: string
  stake: string
  lastVote: string
  status: "Active" | "Jailed"
}

export const columns: ColumnDef<Validator>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "stake",
    header: "Stake",
  },
  {
    accessorKey: "lastVote",
    header: "Last Vote",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant={status === "Active" ? "default" : "destructive"}>{status}</Badge>
    },
  },
]

