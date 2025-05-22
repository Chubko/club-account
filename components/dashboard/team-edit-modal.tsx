"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, X, Loader2 } from "lucide-react"
import { createTeam, updateTeam } from "@/lib/services/api"
import { useToast } from "@/hooks/use-toast"

interface TeamEditModalProps {
  isOpen: boolean
  onClose: () => void
  teamData: any
  onSave: (team: any) => void
}

export function TeamEditModal({ isOpen, onClose, teamData, onSave }: TeamEditModalProps) {
  const isNewTeam = teamData.isNew
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: teamData.name || "",
    division: teamData.division || "",
    usav_code: teamData.usav_code || "",
    age: teamData.age?.toString() || "18",
    rank: teamData.rank?.toString() || "0",
    club_id: teamData.club_id || 1, // Default to first club
  })
  console.log("teamData", teamData)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    try {
      setLoading(true)

      const teamPayload = {
        ...formData,
        age: Number.parseInt(formData.age),
        rank: formData.rank === "0" ? null : Number.parseInt(formData.rank),
      }

      let savedTeam

      if (isNewTeam) {
        savedTeam = await createTeam(teamPayload)
        toast({
          title: "Team created",
          description: "The team has been created successfully.",
        })
      } else {
        savedTeam = await updateTeam(teamData.id, teamPayload)
        toast({
          title: "Team updated",
          description: "The team has been updated successfully.",
        })
      }

      onSave(savedTeam)
    } catch (error) {
      console.error("Error saving team:", error)
      toast({
        title: "Error",
        description: `Failed to ${isNewTeam ? "create" : "update"} team.`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Team:</DialogTitle>
        </DialogHeader>
        <div className="bg-blue-100 p-2 rounded-md mb-4">
          <span className="font-medium">{isNewTeam ? "New Team" : "Edit Team"}</span>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamName" className="text-right">
              Team Name*
            </Label>
            <Input
              id="teamName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="division" className="text-right">
              Division
            </Label>
            <Input
              id="division"
              value={formData.division}
              onChange={(e) => setFormData({ ...formData, division: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamCode" className="text-right">
              USAV 11-digit Team Code
            </Label>
            <Input
              id="teamCode"
              value={formData.usav_code}
              onChange={(e) => setFormData({ ...formData, usav_code: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age*
            </Label>
            <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select age..." />
              </SelectTrigger>
              <SelectContent>
                {["14", "15", "16", "17", "18"].map((age) => (
                  <SelectItem key={age} value={age}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rank" className="text-right">
              Rank
            </Label>
            <Select value={formData.rank} onValueChange={(value) => setFormData({ ...formData, rank: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                {["1", "2", "3"].map((rank) => (
                  <SelectItem key={rank} value={rank}>
                    {rank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-1" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              SAVE
            </Button>
            <Button variant="outline" onClick={onClose} className="flex items-center gap-1">
              <X className="h-4 w-4" />
              CLOSE
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
