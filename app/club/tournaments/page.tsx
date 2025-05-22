"use client"

import { ClubLayout } from "@/components/layout/club-layout"
import { DataTable } from "@/components/ui/data-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ColumnDef } from "@tanstack/react-table"

// Define the Team type for tournaments
type Team = {
  id: string
  name: string
  code: string
  age: number
  rank: number | null
  athletes: number
}

// Define the Athlete type for tournaments
type Athlete = {
  id: string
  name: string
  grad: string
  team: string
  height: string
  position: string
  email: string
  phone: string
  address: string
}

// Sample data (empty for this example)
const teamsData: Team[] = []
const athletesData: Athlete[] = []

// Define columns for the teams data table
const teamColumns: ColumnDef<Team>[] = [
  {
    id: "select",
    header: "-",
    cell: () => <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />,
  },
  {
    accessorKey: "name",
    header: "Team",
  },
  {
    accessorKey: "code",
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
    accessorKey: "athletes",
    header: "Count Of Athletes",
  },
]

// Define columns for the athletes data table
const athleteColumns: ColumnDef<Athlete>[] = [
  {
    id: "select",
    header: "U",
    cell: () => <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "grad",
    header: "Grad.",
  },
  {
    accessorKey: "team",
    header: "Team",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "position",
    header: "Pos.",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "phone",
    header: "Phones",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
]

export default function TournamentsPage() {
  return (
    <ClubLayout showTabs activeTab="tournaments">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">212 Volleyball : Tournaments</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Tournament:</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Select...</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Teams:</h2>
          <DataTable columns={teamColumns} data={teamsData} />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Athletes:</h2>
          <DataTable columns={athleteColumns} data={athletesData} />
        </div>
      </div>
    </ClubLayout>
  )
}
