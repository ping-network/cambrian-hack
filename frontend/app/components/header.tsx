import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, Settings } from "lucide-react"
import { LoginButton } from "./login-button"
import { MobileSidebar } from "./mobile-sidebar"

export function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-4 shadow md:px-6">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/" className="text-xl font-bold text-gray-800 md:text-2xl">
          Ping Validator
        </Link>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Settings className="h-5 w-5" />
        </Button>
        <LoginButton />
      </div>
    </header>
  )
}

