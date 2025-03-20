"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Vote } from "lucide-react"

export function ProposalsContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Governance</h1>
      <p className="text-muted-foreground">
        The Ping Network governance system allows token holders to propose and vote on changes to the network.
      </p>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Vote className="mr-2 h-5 w-5" /> Governance Portal
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg text-center w-full">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              The Ping Network governance portal is currently under development and will be available after the public beta release.
            </p>
            <p className="text-muted-foreground mt-2">
              Stay tuned for updates on proposal creation, voting, and delegation features.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 