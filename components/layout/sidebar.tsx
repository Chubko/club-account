"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Home, UserCog, Layers, ChevronDown, HelpCircle, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { getClubProfileById } from "@/lib/services/api"

export function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const clubMasterId = searchParams.get("club_master_id") || ""
  const clubParam = clubMasterId ? `?club_master_id=${clubMasterId}` : ""

  // Add state for club name
  const [clubName, setClubName] = useState<string>("Loading...")
  const [loading, setLoading] = useState(true)

  // Add effect to fetch club name
  useEffect(() => {
    const fetchClubName = async () => {
      if (!clubMasterId) {
        setClubName("Club Dashboard")
        setLoading(false)
        return
      }

      try {
        const clubData = await getClubProfileById(Number(clubMasterId))
        setClubName(clubData.name)
      } catch (error) {
        console.error("Error fetching club name:", error)
        setClubName("Club Dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchClubName()
  }, [clubMasterId])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-64 border-r h-[calc(100vh-100px)] bg-white">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <h2 className="text-xl font-semibold tracking-tight">Loading...</h2>
            </div>
          ) : (
            <h2 className="text-xl font-semibold tracking-tight">{clubName}</h2>
          )}
        </div>
        <nav className="space-y-1 px-2">
          <Link
            href={`/club${clubParam}`}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive("/club") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Collapsible defaultOpen={pathname.includes("/club/profile")}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              <div className="flex items-center gap-3">
                <UserCog className="h-4 w-4" />
                <span>Profile</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 space-y-1">
              <Link
                href={`/club/profile${clubParam}`}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive("/club/profile") ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                Club Profile
              </Link>
              <Link
                href={`/club/profile/account${clubParam}`}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive("/club/profile/account") ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                Modify Account
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            defaultOpen={
              pathname.includes("/club/athletes") ||
              pathname.includes("/club/staff") ||
              pathname.includes("/club/teams") ||
              pathname.includes("/club/tournaments")
            }
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              <div className="flex items-center gap-3">
                <Layers className="h-4 w-4" />
                <span>Manage Club</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 space-y-1">
              <Link
                href={`/club/athletes${clubParam}`}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive("/club/athletes") ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                Athletes
              </Link>
              <Link
                href={`/club/staff${clubParam}`}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive("/club/staff") ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                Staff
              </Link>
              <Link
                href={`/club/teams${clubParam}`}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive("/club/teams") ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                Teams
              </Link>
              <Link
                href={`/club/tournaments${clubParam}`}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive("/club/tournaments") ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                Tournaments
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Link
            href={`/help${clubParam}`}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive("/help") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
