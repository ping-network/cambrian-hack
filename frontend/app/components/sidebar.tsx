"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Settings, Globe, Network, Vote, Code, Coins } from "lucide-react"

const navItems = [
  { href: "/", label: "Explorer", icon: Globe },  
  { href: "/ncn", label: "NCN", icon: Network },
  { href: "/proposals", label: "Governance", icon: Vote },
  { href: "/staking", label: "Staking", icon: Coins },
  { href: "/settings", label: "Programs", icon: Code },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("w-64 bg-gray-800 text-white", className)}>
      <ul className="space-y-2 py-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-2 hover:bg-gray-700",
                pathname === item.href && "bg-gray-700",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

