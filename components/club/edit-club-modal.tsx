"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateClubProfile } from "@/lib/services/api"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// USAV Region options
const usavRegions = [
    { value: "AK", label: "Alaska (AK)" },
    { value: "AH", label: "Aloha (AH)" },
    { value: "AZ", label: "Arizona (AZ)" },
    { value: "BG", label: "Badger (BG)" },
    { value: "BY", label: "Bayou (BY)" },
    { value: "CR", label: "Carolina (CR)" },
    { value: "CH", label: "Chesapeake (CH)" },
    { value: "CE", label: "Columbia Empire (CE)" },
    { value: "DE", label: "Delta (DE)" },
    { value: "EV", label: "Evergreen (EV)" },
    { value: "FL", label: "Florida (FL)" },
    { value: "GE", label: "Garden Empire (GE)" },
    { value: "GW", label: "Gateway (GW)" },
    { value: "GL", label: "Great Lakes (GL)" },
    { value: "GP", label: "Great Plains (GP)" },
    { value: "GC", label: "Gulf Coast (GC)" },
    { value: "HA", label: "Heart of America (HA)" },
    { value: "HO", label: "Hoosier (HO)" },
    { value: "IM", label: "Intermountain (IM)" },
    { value: "IA", label: "Iowa (IA)" },
    { value: "IE", label: "Iroquois Empire (IE)" },
    { value: "KE", label: "Keystone (KE)" },
    { value: "LK", label: "Lakeshore (LK)" },
    { value: "LS", label: "Lone Star (LS)" },
    { value: "MK", label: "Moku O Keawe (MK)" },
    { value: "NE", label: "New England (NE)" },
    { value: "NO", label: "North Country (NO)" },
    { value: "NT", label: "North Texas (NT)" },
    { value: "NC", label: "Northern California (NC)" },
    { value: "OV", label: "Ohio Valley (OV)" },
    { value: "OK", label: "Oklahoma (OK)" },
    { value: "OD", label: "Old Dominion (OD)" },
    { value: "PM", label: "Palmetto (PM)" },
    { value: "PR", label: "Pioneer (PR)" },
    { value: "PS", label: "Puget Sound (PS)" },
    { value: "RM", label: "Rocky Mountain (RM)" },
    { value: "SO", label: "Southern (SO)" },
    { value: "SC", label: "Southern California (SC)" },
    { value: "SU", label: "Sun Country (SU)" },
    { value: "WE", label: "Western Empire (WE)" },
]

// State options
const states = [
    { value: "AB", label: "Alberta" },
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "BC", label: "British Columbia" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DC", label: "District of Columbia" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "MB", label: "Manitoba" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NB", label: "New Brunswick" },
    { value: "NE", label: "Nebraska" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NM", label: "New Mexico" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NV", label: "Nevada" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "ON", label: "Ontario" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "PR", label: "Puerto Rico" },
    { value: "QC", label: "Quebec" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "SK", label: "Saskatchewan" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
]

interface EditClubModalProps {
    isOpen: boolean
    onClose: () => void
    club: any
    onSuccess: () => void
}

export function EditClubModal({ isOpen, onClose, club, onSuccess }: EditClubModalProps) {
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        usav_region: "",
        usav_code: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        website: "",
        office_phone: "",
        other_phone: "",
        fax: "",
        email: "",
        sport_gender: "",
        coord_first: "",
        coord_last: "",
        coord_email: "",
        coord_phone: "",
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (club) {
            setFormData({
                id: club.id,
                name: club.name !== "N/A" ? club.name : "",
                usav_region: club.usav_region !== "N/A" ? club.usav_region : "",
                usav_code: club.usav_code !== "N/A" ? club.usav_code : "",
                address: club.address !== "N/A" ? club.address : "",
                address2: club.address2 !== "N/A" ? club.address2 : "",
                city: club.city !== "N/A" ? club.city : "",
                state: club.state !== "N/A" ? club.state : "",
                zip: club.zip !== "N/A" ? club.zip : "",
                website: club.website !== "N/A" ? club.website : "",
                office_phone: club.office_phone !== "N/A" ? club.office_phone : "",
                other_phone: club.other_phone !== "N/A" ? club.other_phone : "",
                fax: club.fax !== "N/A" ? club.fax : "",
                email: club.email !== "N/A" ? club.email : "",
                sport_gender: club.sport_gender !== "N/A" ? club.sport_gender : "",
                coord_first: club.coord_first !== "N/A" ? club.coord_first : "",
                coord_last: club.coord_last !== "N/A" ? club.coord_last : "",
                coord_email: club.coord_email !== "N/A" ? club.coord_email : "",
                coord_phone: club.coord_phone !== "N/A" ? club.coord_phone : "",
            })
        }
    }, [club])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name) {
            newErrors.name = "Club name is required"
        }

        if (!formData.usav_region) {
            newErrors.usav_region = "USAV Region is required"
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format"
        }

        if (formData.coord_email && !/\S+@\S+\.\S+/.test(formData.coord_email)) {
            newErrors.coord_email = "Invalid email format"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) return

        try {
            setLoading(true)
            await updateClubProfile(formData)
            toast({
                title: "Success",
                description: "Club information updated successfully",
                variant: "default",
            })
            onSuccess()
            onClose()
        } catch (error) {
            console.error("Error updating club:", error)
            toast({
                title: "Error",
                description: "Failed to update club information",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Edit Club</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Club Name *
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.name}</p>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="usav_region" className="text-right">
                            USAV Region *
                        </Label>
                        <div className="col-span-3">
                            <Select
                                value={formData.usav_region || undefined}
                                onValueChange={(value) => handleSelectChange("usav_region", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select USAV Region..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {usavRegions.map((region) => (
                                        <SelectItem key={region.value} value={region.value}>
                                            {region.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.usav_region && <p className="text-red-500 text-sm">{errors.usav_region}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="usav_code" className="text-right">
                            5dgt USAV Code
                        </Label>
                        <Input
                            id="usav_code"
                            name="usav_code"
                            value={formData.usav_code}
                            onChange={handleChange}
                            className="col-span-3"
                            maxLength={5}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Address
                        </Label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address2" className="text-right">
                            Address 2
                        </Label>
                        <Input
                            id="address2"
                            name="address2"
                            value={formData.address2}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="city" className="text-right">
                            City
                        </Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="state" className="text-right">
                            State
                        </Label>
                        <div className="col-span-3">
                            <Select value={formData.state || undefined} onValueChange={(value) => handleSelectChange("state", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select State..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {states.map((state) => (
                                        <SelectItem key={state.value} value={state.value}>
                                            {state.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="zip" className="text-right">
                            ZIP
                        </Label>
                        <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="website" className="text-right">
                            Club Website
                        </Label>
                        <Input
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="office_phone" className="text-right">
                            Office Phone
                        </Label>
                        <Input
                            id="office_phone"
                            name="office_phone"
                            value={formData.office_phone}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="other_phone" className="text-right">
                            Other Phone
                        </Label>
                        <Input
                            id="other_phone"
                            name="other_phone"
                            value={formData.other_phone}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fax" className="text-right">
                            Fax
                        </Label>
                        <Input id="fax" name="fax" value={formData.fax} onChange={handleChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            E-mail
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                        {errors.email && <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.email}</p>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sport_gender" className="text-right">
                            Sport Gender
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="sport_gender"
                                name="sport_gender"
                                value={formData.sport_gender}
                                onChange={handleChange}
                                className="col-span-3"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coord_first" className="text-right">
                            Coor. First
                        </Label>
                        <Input
                            id="coord_first"
                            name="coord_first"
                            value={formData.coord_first}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coord_last" className="text-right">
                            Coor. Last
                        </Label>
                        <Input
                            id="coord_last"
                            name="coord_last"
                            value={formData.coord_last}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coord_email" className="text-right">
                            Coor. Email
                        </Label>
                        <Input
                            id="coord_email"
                            name="coord_email"
                            type="email"
                            value={formData.coord_email}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                        {errors.coord_email && <p className="text-red-500 text-sm col-span-3 col-start-2">{errors.coord_email}</p>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coord_phone" className="text-right">
                            Coor. Phone
                        </Label>
                        <Input
                            id="coord_phone"
                            name="coord_phone"
                            value={formData.coord_phone}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
