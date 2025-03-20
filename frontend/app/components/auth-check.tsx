"use client"

import { useWalletConnection } from "../hooks/useWalletConnection"
import { Card, CardContent } from "@/components/ui/card"
import type React from "react" // Added import for React

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const { isConnected } = useWalletConnection()

  if (!isConnected) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
            <p>Please connect your wallet to access this page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

