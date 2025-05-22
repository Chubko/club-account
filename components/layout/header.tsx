"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { LogOut, User } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Add these imports at the top
import { useState, useEffect } from "react"
import { getClubProfileById } from "@/lib/services/api"
import { Loader2 } from "lucide-react"

// Add these imports
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const clubMasterId = searchParams.get("club_master_id") || ""
  const clubParam = clubMasterId ? `?club_master_id=${clubMasterId}` : ""

  const username = "Luda Chubko" // This would come from auth context in a real app

  // Add this state inside the Header component
  const [clubName, setClubName] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Add this state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Add this useEffect to fetch the club name
  useEffect(() => {
    const fetchClubName = async () => {
      if (!clubMasterId) return

      try {
        setLoading(true)
        const clubData = await getClubProfileById(Number(clubMasterId))
        setClubName(clubData.name)
      } catch (error) {
        console.error("Error fetching club name:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClubName()
  }, [clubMasterId])

  return (
    <header className="bg-gray-100 border-b h-[100px] flex items-end">
      <div className="container flex items-end justify-between px-4 pb-3">
        <div className="flex items-center gap-4">
          <Link href={`/club${clubParam}`} className="flex items-center">
            <div className="relative h-[90px] w-[200px]">
              <Image src="/logo.svg" alt="University Athlete" fill style={{ objectFit: "contain" }} priority />
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href={`/club${clubParam}`}
            className={`text-base font-medium transition-colors hover:text-primary ${
              pathname === "/club" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href={`/club/profile${clubParam}`}
            className={`text-base font-medium transition-colors hover:text-primary ${
              pathname.startsWith("/club/profile") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Profile
          </Link>
          <Link
            href={`/club/athletes${clubParam}`}
            className={`text-base font-medium transition-colors hover:text-primary ${
              pathname.startsWith("/club/athletes") ||
              pathname.startsWith("/club/staff") ||
              pathname.startsWith("/club/teams") ||
              pathname.startsWith("/club/tournaments")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Manage Club
          </Link>
          <Link
            href={`/help${clubParam}`}
            className={`text-base font-medium transition-colors hover:text-primary ${
              pathname === "/help" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Help
          </Link>
        </nav>
        <div className="flex items-end gap-4">
          <div className="text-base text-muted-foreground hidden md:block">
            Logged as <span className="font-medium">{username}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <User className="h-6 w-6" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild className="text-base">
                <Link href={`/club/profile${clubParam}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-base">
                <Link href={`/club/profile/account${clubParam}`}>Modify Account</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-base">
                <Link href="/logout" className="flex items-center">
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden h-10 w-10" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open mobile menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[250px] sm:w-[300px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between py-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                href={`/club${clubParam}`}
                className={`text-base font-medium px-4 py-2 rounded-md ${pathname === "/club" ? "bg-accent" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={`/club/profile${clubParam}`}
                className={`text-base font-medium px-4 py-2 rounded-md ${
                  pathname.startsWith("/club/profile") ? "bg-accent" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href={`/club/athletes${clubParam}`}
                className={`text-base font-medium px-4 py-2 rounded-md ${
                  pathname.startsWith("/club/athletes") ? "bg-accent" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Athletes
              </Link>
              <Link
                href={`/club/staff${clubParam}`}
                className={`text-base font-medium px-4 py-2 rounded-md ${
                  pathname.startsWith("/club/staff") ? "bg-accent" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Staff
              </Link>
              <Link
                href={`/club/teams${clubParam}`}
                className={`text-base font-medium px-4 py-2 rounded-md ${
                  pathname.startsWith("/club/teams") ? "bg-accent" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Teams
              </Link>
              <Link
                href={`/club/tournaments${clubParam}`}
                className={`text-base font-medium px-4 py-2 rounded-md ${
                  pathname.startsWith("/club/tournaments") ? "bg-accent" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tournaments
              </Link>
              <Link
                href={`/help${clubParam}`}
                className={`text-base font-medium px-4 py-2 rounded-md ${pathname === "/help" ? "bg-accent" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Help
              </Link>
            </nav>
            <div className="mt-auto border-t py-4 px-4">
              <div className="text-base mb-4">
                Logged as <span className="font-medium">{username}</span>
              </div>
              <Link
                href="/logout"
                className="flex items-center text-base font-medium text-destructive"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogOut className="mr-2 h-5 w-5" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
