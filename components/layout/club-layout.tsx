"use client"

import type React from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface ClubLayoutProps {
  children: React.ReactNode
  showTabs?: boolean
  activeTab?: string
}

export function ClubLayout({ children, showTabs = false, activeTab = "athletes" }: ClubLayoutProps) {
  const searchParams = useSearchParams()
  const clubMasterId = searchParams.get("club_master_id") || ""
  const clubParam = clubMasterId ? `?club_master_id=${clubMasterId}` : ""

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {showTabs && (
            <div className="mb-6 overflow-x-auto">
              <Tabs defaultValue={activeTab}>
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="athletes" asChild>
                    <Link href={`/club/athletes${clubParam}`}>Athletes</Link>
                  </TabsTrigger>
                  <TabsTrigger value="staff" asChild>
                    <Link href={`/club/staff${clubParam}`}>Staff</Link>
                  </TabsTrigger>
                  <TabsTrigger value="teams" asChild>
                    <Link href={`/club/teams${clubParam}`}>Teams</Link>
                  </TabsTrigger>
                  <TabsTrigger value="tournaments" asChild>
                    <Link href={`/club/tournaments${clubParam}`}>Tournaments</Link>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
