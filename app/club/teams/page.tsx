"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ClubLayout } from "@/components/layout/club-layout"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Edit, Trash, UserPlus, Loader2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { getTeams, deleteTeam, getClubProfileById } from "@/lib/services/api"
import { TeamEditModal } from "@/components/dashboard/team-edit-modal"
import { useToast } from "@/hooks/use-toast"

type Team = {
  id: number
  name: string
  usav_code: string
  age: number
  rank: number | null
  _count: {
    athlete_teams: number
  }
  created_at?: string
}

export default function TeamsPage() {
  const searchParams = useSearchParams()
  const clubMasterId = Number(searchParams.get("club_master_id")) || 1

  const [clubName, setClubName] = useState<string>("Loading...")
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [teamsData, clubData] = await Promise.all([getTeams(clubMasterId), getClubProfileById(clubMasterId)])
        setTeams(teamsData)
        setClubName(clubData.name)
      } catch (err) {
        setError("Failed to load data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [clubMasterId])

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeam(id)
        setTeams(teams.filter((team) => team.id !== id))
        toast({
          title: "Team deleted",
          description: "The team has been deleted successfully.",
        })
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to delete team.",
          variant: "destructive",
        })
        console.error(err)
      }
    }
  }

  const columns: ColumnDef<Team>[] = [
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setSelectedTeam(row.original)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
    {
      accessorKey: "name",
      header: "Team",
      cell: ({ row }) => {
        return (
          <button onClick={() => setSelectedTeam(row.original)} className="text-blue-600 hover:underline text-left">
            {row.getValue("name")}
          </button>
        )
      },
    },
    {
      accessorKey: "usav_code",
      header: "USAV Team Code",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "rank",
      header: "Rank",
    },
    {
      accessorKey: "_count.athlete_teams",
      header: "Athletes",
      cell: ({ row }) => {
        const count = row.original._count?.athlete_teams || 0
        return (
          <a
            href={`/club/athletes?teamId=${row.original.id}&club_master_id=${clubMasterId}`}
            className="text-blue-600 hover:underline"
          >
            {count}
          </a>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: "Date Created",
      cell: ({ row }) => {
        const date = row.original.created_at ? new Date(row.original.created_at) : null
        return date ? date.toLocaleDateString() : "N/A"
      },
    },
  ]

  if (loading) {
    return (
      <ClubLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ClubLayout>
    )
  }

  if (error) {
    return (
      <ClubLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
      </ClubLayout>
    )
  }

  return (
    <ClubLayout showTabs activeTab="teams">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{clubName} : Teams</h1>
        </div>

        <DataTable columns={columns} data={teams} />

        <div>
          <Button
            className="flex items-center gap-2"
            onClick={() => setSelectedTeam({ isNew: true, club_id: clubMasterId })}
          >
            <UserPlus className="h-4 w-4" />
            <span>New Team</span>
          </Button>
        </div>
      </div>

      {selectedTeam && (
        <TeamEditModal
          isOpen={!!selectedTeam}
          onClose={() => setSelectedTeam(null)}
          teamData={selectedTeam}
          onSave={(updatedTeam) => {
            if (selectedTeam.isNew) {
              setTeams([...teams, updatedTeam])
            } else {
              setTeams(teams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team)))
            }
            setSelectedTeam(null)
          }}
        />
      )}
    </ClubLayout>
  )
}
