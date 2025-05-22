"use client"

import type React from "react"

import { useState } from "react"
import { ClubLayout } from "@/components/layout/club-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, X } from "lucide-react"

export default function ModifyAccountPage() {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    // In a real app, we would navigate back to the profile page
    window.history.back()
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would save the data
    handleClose()
  }

  // Handle dialog close (including clicking outside)
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleClose()
    }
  }

  return (
    <ClubLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">212 Volleyball : Club Profile</h1>
        </div>

        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Club User Account</DialogTitle>
              <DialogDescription>Make changes to your account here.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="first" className="text-right">
                    First*
                  </Label>
                  <Input id="first" defaultValue="Luda" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="last" className="text-right">
                    Last*
                  </Label>
                  <Input id="last" defaultValue="Chubko" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    E-mail*
                  </Label>
                  <Input id="email" type="email" defaultValue="luda.chubko@gmail.com" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="workPhone" className="text-right">
                    Work Phone
                  </Label>
                  <Input id="workPhone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cellPhone" className="text-right">
                    Cell Phone
                  </Label>
                  <Input id="cellPhone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username*
                  </Label>
                  <Input id="username" defaultValue="luda.chubko@gmail.com" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input id="password" type="password" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="confirm" className="text-right">
                    Confirm
                  </Label>
                  <Input id="confirm" type="password" className="col-span-3" />
                </div>
              </div>

              <div className="mt-4 text-sm">
                <p>Two-Factor Authentication helps protect your account.</p>
                <div className="mt-2">
                  <p className="font-medium">Your verified e-mails:</p>
                  <p>luda.chubko@gmail.com</p>
                </div>
                <div className="mt-2">
                  <Button type="button" variant="link" className="p-0 h-auto">
                    Manage Contacts
                  </Button>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={handleClose} className="flex items-center gap-1">
                  <X className="h-4 w-4" />
                  CLOSE
                </Button>
                <Button type="submit" className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  SAVE
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ClubLayout>
  )
}
