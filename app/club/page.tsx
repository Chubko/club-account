"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ClubLayout } from "@/components/layout/club-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { TeamEditModal } from "@/components/dashboard/team-edit-modal"
import { ClubProfileContent } from "@/components/dashboard/club-profile-content"
import { TeamsContent } from "@/components/dashboard/teams-content"
import { getClubProfileById } from "@/lib/services/api"
import { Loader2 } from "lucide-react"

// Define the initial card visibility state
const defaultCardVisibility = {
  clubProfile: true,
  searchAthlete: true,
  teams: true,
  tournamentInfo: true,
}

const defaultCardColors = {
  clubProfile: "gray",
  searchAthlete: "gray",
  teams: "gray",
  tournamentInfo: "gray",
}

export default function ClubDashboard() {
  const searchParams = useSearchParams()
  const clubMasterId = Number(searchParams.get("club_master_id")) || 1

  const [clubName, setClubName] = useState<string>("Loading...")
  const [loading, setLoading] = useState(true)

  // State to track which cards are visible
  const [cardVisibility, setCardVisibility] = useState(() => {
    // Try to load from localStorage if available (client-side only)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dashboardCardVisibility")
      return saved ? JSON.parse(saved) : { ...defaultCardVisibility }
    }
    return { ...defaultCardVisibility }
  })

  const [cardColors, setCardColors] = useState(() => {
    // Try to load from localStorage if available (client-side only)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dashboardCardColors")
      return saved ? JSON.parse(saved) : { ...defaultCardColors }
    }
    return { ...defaultCardColors }
  })

  const [selectedTeam, setSelectedTeam] = useState<any>(null)

  // Fetch club name when clubMasterId changes
  useEffect(() => {
    const fetchClubName = async () => {
      try {
        setLoading(true)
        const clubData = await getClubProfileById(clubMasterId)
        setClubName(clubData.name)
      } catch (error) {
        console.error("Error fetching club name:", error)
        setClubName("Unknown Club")
      } finally {
        setLoading(false)
      }
    }

    fetchClubName()
  }, [clubMasterId])

  // Save visibility state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("dashboardCardVisibility", JSON.stringify(cardVisibility))
    localStorage.setItem("dashboardCardColors", JSON.stringify(cardColors))
  }, [cardVisibility, cardColors])

  // Handle card visibility changes
  const handleCardVisibilityChange = (id: string, visible: boolean) => {
    setCardVisibility((prev) => ({
      ...prev,
      [id]: visible,
    }))
  }

  const handleCardColorChange = (id: string, color: string) => {
    setCardColors((prev) => ({
      ...prev,
      [id]: color,
    }))
  }

  // Restore default layout
  const restoreDefaultLayout = () => {
    setCardVisibility({ ...defaultCardVisibility })
    setCardColors({ ...defaultCardColors })
  }

  return (
    <ClubLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Club : {loading ? <Loader2 className="inline h-5 w-5 animate-spin" /> : clubName}
          </h1>
        </div>

        {/* First row: Club Profile and Search Athlete */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Club Profile Card */}
          {cardVisibility.clubProfile && (
            <DashboardCard
              id="clubProfile"
              defaultTitle="Club Profile"
              defaultColor={cardColors.clubProfile as any}
              onVisibilityChange={handleCardVisibilityChange}
              onColorChange={handleCardColorChange}
            >
              <ClubProfileContent clubId={clubMasterId} />
            </DashboardCard>
          )}

          {/* Search Athlete Card */}
          {cardVisibility.searchAthlete && (
            <DashboardCard
              id="searchAthlete"
              defaultTitle="Search Athlete"
              defaultColor={cardColors.searchAthlete as any}
              onVisibilityChange={handleCardVisibilityChange}
              onColorChange={handleCardColorChange}
            >
              <div className="space-y-4">
                <p className="text-sm">Search athlete in "{clubName}" club by Last name:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter last name"
                  />
                  <Button>Search</Button>
                </div>
              </div>
            </DashboardCard>
          )}
        </div>

        {/* Second row: Tournament Information and Teams */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Tournament Information Card */}
          {cardVisibility.tournamentInfo && (
            <DashboardCard
              id="tournamentInfo"
              defaultTitle="Tournament Information"
              defaultColor={cardColors.tournamentInfo as any}
              onVisibilityChange={handleCardVisibilityChange}
              onColorChange={handleCardColorChange}
            >
              <p className="text-sm">
                To view a list of colleges attending each tournament, you can use{" "}
                <Link href="/club/college/attending" className="text-blue-600 hover:underline">
                  Attendings page
                </Link>
                .
              </p>
            </DashboardCard>
          )}

          {/* Teams Card */}
          {cardVisibility.teams && (
            <DashboardCard
              id="teams"
              defaultTitle="Teams"
              defaultColor={cardColors.teams as any}
              onVisibilityChange={handleCardVisibilityChange}
              onColorChange={handleCardColorChange}
            >
              <TeamsContent clubId={clubMasterId} onTeamSelect={setSelectedTeam} />
            </DashboardCard>
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <button className="text-blue-600 hover:underline" onClick={restoreDefaultLayout}>
            (Restore layout to default)
          </button>
        </div>
      </div>
      {selectedTeam && (
        <TeamEditModal
          isOpen={!!selectedTeam}
          onClose={() => setSelectedTeam(null)}
          teamData={selectedTeam}
          onSave={(updatedTeam) => {
            setSelectedTeam(null)
          }}
        />
      )}
    </ClubLayout>
  )
}
