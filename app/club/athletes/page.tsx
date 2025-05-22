"use client"

import { ClubLayout } from "@/components/layout/club-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define the Athlete type
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
const athletesData: Athlete[] = []

// Define columns for the data table
const columns: ColumnDef<Athlete>[] = [
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

export default function AthletesPage() {
  return (
    <ClubLayout showTabs activeTab="athletes">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">212 Volleyball : Athletes</h1>
        </div>

        <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Editing athletes in University Athlete does NOT update official tournament rosters. Those changes need to be
            made in the tournament registration system, ie, SportWrench, AES, TM2Sign, etc. We import roster updates
            every day during the week of the event up through the first morning of the event.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
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

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Team:</span>
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

        <div className="bg-blue-100 p-2 rounded-md">
          <span className="font-medium">Show/Hide Club Staff Info</span>
        </div>

        <div className="bg-blue-100 p-2 rounded-md">
          <span className="font-medium">Athletes</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Last Name:</span>
              <Input className="w-[200px]" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Grad.year:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button>Search</Button>
            <Button variant="outline">Clear</Button>
          </div>

          <Button variant="destructive">Remove selected from club</Button>
        </div>

        <DataTable columns={columns} data={athletesData} />
      </div>
    </ClubLayout>
  )
}
