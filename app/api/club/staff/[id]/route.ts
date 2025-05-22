import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { staffSchema } from "@/lib/validations/staff"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid staff ID" }, { status: 400 })
    }

    const staff = await prisma.club_staff_master.findUnique({
      where: { id },
      include: {
        rosters: true,
      },
    })

    if (!staff) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json(staff)
  } catch (error) {
    console.error("Error fetching staff member:", error)
    return NextResponse.json({ error: "Failed to fetch staff member" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid staff ID" }, { status: 400 })
    }

    const data = await request.json()

    try {
      const validatedData = staffSchema.parse(data)

      const staff = await prisma.club_staff_master.findUnique({
        where: { id },
      })

      if (!staff) {
        return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
      }

      const updatedStaff = await prisma.club_staff_master.update({
        where: { id },
        data: validatedData,
      })

      return NextResponse.json(updatedStaff)
    } catch (validationError: any) {
      return NextResponse.json({ error: validationError.errors }, { status: 400 })
    }
  } catch (error) {
    console.error("Error updating staff member:", error)
    return NextResponse.json({ error: "Failed to update staff member" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid staff ID" }, { status: 400 })
    }

    const staff = await prisma.club_staff_master.findUnique({
      where: { id },
    })

    if (!staff) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
    }

    // Delete related records first
    await prisma.club_staff_roster.deleteMany({
      where: { staff_id: id },
    })

    // Then delete the staff member
    await prisma.club_staff_master.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Staff member deleted successfully" })
  } catch (error) {
    console.error("Error deleting staff member:", error)
    return NextResponse.json({ error: "Failed to delete staff member" }, { status: 500 })
  }
}
