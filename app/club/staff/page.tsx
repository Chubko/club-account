"use client"

import { ClubLayout } from "@/components/layout/club-layout"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash, UserPlus } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

// Define the Staff type
type Staff = {
  id: string
  first: string
  last: string
  role: string
  email: string
  phone: string
  address: string
}

// Sample data
const staffData: Staff[] = [
  {
    id: "1",
    first: "Samantha",
    last: "Beedlow",
    role: "N/A",
    email: "212degreesvb@gmail.com",
    phone: "N/A",
    address: "",
  },
  { id: "2", first: "Jaymie", last: "Bryson", role: "N/A", email: "212degreesvb@gmail.com", phone: "N/A", address: "" },
  { id: "3", first: "Joanie", last: "Casey", role: "N/A", email: "212degreesvb@gmail.com", phone: "N/A", address: "" },
  {
    id: "4",
    first: "Frances",
    last: "Davies",
    role: "Head Coach => 212.18.1",
    email: "davies.frances.r@gmail.com",
    phone: "(817) 219-7464(H) (817) 219-7464(C)",
    address: "",
  },
  { id: "5", first: "Erin", last: "Ferrari", role: "N/A", email: "", phone: "N/A", address: "" },
  {
    id: "6",
    first: "Holli",
    last: "Grant",
    role: "N/A",
    email: "holli.palmer@gmail.com",
    phone: "N/A",
    address: ", TX",
  },
  {
    id: "7",
    first: "Christian",
    last: "Griffin",
    role: "Assistant Coach => 212.18.1",
    email: "christiangriffin@gmail.com",
    phone: "(682) 309-7462(H)",
    address: "",
  },
  {
    id: "8",
    first: "Mia",
    last: "Hartzog",
    role: "N/A",
    email: "212degreesvb@gmail.com",
    phone: "N/A",
    address: ", TX",
  },
  {
    id: "9",
    first: "Bella",
    last: "Helmick",
    role: "Assistant Coach => 212.17.1",
    email: "bbellaa803@gmail.com",
    phone: "N/A",
    address: ", TX",
  },
  {
    id: "10",
    first: "William",
    last: "Landy",
    role: "Head Coach => 212.16.1",
    email: "landy05@att.net",
    phone: "N/A",
    address: "",
  },
]

// Define columns for the data table
const columns: ColumnDef<Staff>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "first",
    header: "First",
  },
  {
    accessorKey: "last",
    header: "Last",
  },
  {
    accessorKey: "role",
    header: "Roles",
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

export default function StaffPage() {
  return (
    <ClubLayout showTabs activeTab="staff">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">212 Volleyball : Staff</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Team:</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Team..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Select Team...</SelectItem>
                <SelectItem value="212.18.1">212.18.1</SelectItem>
                <SelectItem value="212.17.1">212.17.1</SelectItem>
                <SelectItem value="212.17.2">212.17.2</SelectItem>
                <SelectItem value="212.16.1">212.16.1</SelectItem>
                <SelectItem value="212.15.1">212.15.1</SelectItem>
                <SelectItem value="212.15.2">212.15.2</SelectItem>
                <SelectItem value="212.14.1">212.14.1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DataTable columns={columns} data={staffData} />

        <div>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>New Staff</span>
          </Button>
        </div>
      </div>
    </ClubLayout>
  )
}
