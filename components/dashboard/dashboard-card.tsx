"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, X, Edit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type ColorOption = "yellow" | "red" | "teal" | "gray" | "orange" | "green"

const colorMap: Record<ColorOption, string> = {
  yellow: "bg-amber-400 text-black",
  red: "bg-red-600 text-white",
  teal: "bg-teal-600 text-white",
  gray: "bg-gray-200 text-black",
  orange: "bg-orange-500 text-white",
  green: "bg-green-600 text-white",
}

interface DashboardCardProps {
  id: string
  defaultTitle: string
  defaultColor: ColorOption
  children: React.ReactNode
  onVisibilityChange?: (id: string, visible: boolean) => void
  onColorChange?: (id: string, color: string) => void
}

export function DashboardCard({
  id,
  defaultTitle,
  defaultColor,
  children,
  onVisibilityChange,
  onColorChange,
}: DashboardCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [title, setTitle] = useState(defaultTitle)
  const [color, setColor] = useState<ColorOption>(defaultColor)
  const [showCloseDialog, setShowCloseDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showEditDialog && titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [showEditDialog])

  const handleClose = () => {
    setIsVisible(false)
    onVisibilityChange?.(id, false)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleEditSave = () => {
    setShowEditDialog(false)
    onColorChange?.(id, color)
  }

  if (!isVisible) return null

  return (
    <>
      <Card className="h-full">
        <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${colorMap[color]}`}>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-current hover:bg-black/10"
              onClick={toggleCollapse}
            >
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              <span className="sr-only">{isCollapsed ? "Expand" : "Collapse"}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-current hover:bg-black/10"
              onClick={() => setShowEditDialog(true)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-current hover:bg-black/10"
              onClick={() => setShowCloseDialog(true)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>
        {!isCollapsed && <CardContent className="pt-4">{children}</CardContent>}
      </Card>

      {/* Close Confirmation Dialog */}
      <Dialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>This widget will be removed, ok?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCloseDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose()
                setShowCloseDialog(false)
              }}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Change the title:
              </label>
              <Input id="title" ref={titleInputRef} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Available colors:</label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(colorMap) as ColorOption[]).map((colorOption) => (
                  <button
                    key={colorOption}
                    className={`h-6 w-6 rounded-sm border ${
                      colorOption === color ? "ring-2 ring-black ring-offset-2" : ""
                    } ${colorMap[colorOption].split(" ")[0]}`}
                    onClick={() => setColor(colorOption)}
                    aria-label={`Select ${colorOption} color`}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
