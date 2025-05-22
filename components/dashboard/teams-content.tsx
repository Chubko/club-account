"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getTeams } from "@/lib/services/api"
import { Loader2 } from "lucide-react"

interface TeamsContentProps {
  clubId: number
  onTeamSelect: (team: any) => void
}

export function TeamsContent({ clubId, onTeamSelect }: TeamsContentProps) {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const data = await getTeams(clubId)
        setTeams(data)
      } catch (err) {
        setError("Failed to load teams")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [clubId])

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>
  }

  if (teams.length === 0) {
    return <div className="text-sm">No teams found for this club</div>
  }

  return (
    <>
      <ul className="space-y-1 text-sm">
        {teams.map((team) => (
          <li key={team.id} className="flex justify-between">
            <button onClick={() => onTeamSelect(team)} className="text-blue-600 hover:underline text-left">
              {team.name}
            </button>
            <span>
              ({team.usav_code || "N/A"}) Age -{team.age || "N/A"}
              {team.rank ? `, Rank -${team.rank}` : ""}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-right">
        <Link href={`/club/teams?club_master_id=${clubId}`} className="text-blue-600 hover:underline text-sm">
          More...
        </Link>
      </div>
    </>
  )
}
