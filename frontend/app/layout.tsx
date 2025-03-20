import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "./components/header"
import { Sidebar } from "./components/sidebar"
import { ClientWalletProvider } from "./providers/WalletProvider"
import { Toaster } from "@/components/ui/sonner"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ping Validator Dashboard",
  description: "Admin dashboard for monitoring VPN nodes uptime and stats",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWalletProvider>
          <div className="flex h-screen flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar className="hidden md:block" />
              <main className="flex-1 overflow-y-auto bg-gray-100 p-4">{children}</main>
            </div>
          </div>
          <Toaster />
        </ClientWalletProvider>
      </body>
    </html>
  )
}

