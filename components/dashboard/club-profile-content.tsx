"use client"

import { useState, useEffect } from "react"
import { getClubProfileById } from "@/lib/services/api"
import { Loader2 } from "lucide-react"

interface ClubProfileContentProps {
  clubId: number
}

export function ClubProfileContent({ clubId }: ClubProfileContentProps) {
  const [club, setClub] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClubProfile = async () => {
      try {
        setLoading(true)
        const data = await getClubProfileById(clubId)
        setClub(data)
      } catch (err) {
        setError("Failed to load club profile")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClubProfile()
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

  if (!club) {
    return <div className="text-sm">No club data available</div>
  }
    console.log('club 66788898909', club)
  // Display club data in two columns: name and value
  return (
    <dl className="grid grid-cols-2 gap-1 text-sm">
      <dt className="font-medium">Club Name:</dt>
      <dd>{club.name}</dd>

      <dt className="font-medium">USAV Region:</dt>
      <dd>{club.usav_region}</dd>

      <dt className="font-medium">5dgt USAV Code:</dt>
      <dd>{club.usav_code}</dd>

      <dt className="font-medium">Address:</dt>
      <dd>{club.address}</dd>

      {club.address2 !== "N/A" && (
        <>
          <dt className="font-medium">Address 2:</dt>
          <dd>{club.address2}</dd>
        </>
      )}

      <dt className="font-medium">City:</dt>
      <dd>{club.city}</dd>

      <dt className="font-medium">State:</dt>
      <dd>{club.state}</dd>

      <dt className="font-medium">ZIP:</dt>
      <dd>{club.zip}</dd>

      <dt className="font-medium">Club Website:</dt>
      <dd className="truncate">
        {club.website !== "N/A" ? (
          <a
            target="_blank"
            href={club.website.startsWith("http") ? club.website : `http://${club.website}`}
            className="text-blue-600 hover:underline"
            rel="noreferrer"
          >
            {club.website}
          </a>
        ) : (
          "N/A"
        )}
      </dd>

      <dt className="font-medium">Office Phone:</dt>
      <dd>{club.office_phone}</dd>

      <dt className="font-medium">Other Phone:</dt>
      <dd>{club.other_phone}</dd>

      <dt className="font-medium">Fax:</dt>
      <dd>{club.fax}</dd>

      <dt className="font-medium">E-mail:</dt>
      <dd className="truncate">
        {club.email !== "N/A" ? (
          <a
            href={`mailto:${club.email}`}
            className="text-blue-600 hover:underline"
            onClick={(e) => {
              window.open(`mailto:${club.email}`, "_blank")
              e.preventDefault()
            }}
          >
            {club.email}
          </a>
        ) : (
          "N/A"
        )}
      </dd>

      <dt className="font-medium">Sport Gender:</dt>
      <dd>{club.sport_gender}</dd>

      {club.coord_first !== "N/A" && (
        <>
          <dt className="font-medium">Coor. First:</dt>
          <dd>{club.coord_first}</dd>
        </>
      )}

      {club.coord_last !== "N/A" && (
        <>
          <dt className="font-medium">Coor. Last:</dt>
          <dd>{club.coord_last}</dd>
        </>
      )}

      {club.coord_email !== "N/A" && (
        <>
          <dt className="font-medium">Coor. Email:</dt>
          <dd className="truncate">
            <a
              href={`mailto:${club.coord_email}`}
              className="text-blue-600 hover:underline"
              onClick={(e) => {
                window.open(`mailto:${club.coord_email}`, "_blank")
                e.preventDefault()
              }}
            >
              {club.coord_email}
            </a>
          </dd>
        </>
      )}

      {club.coord_phone !== "N/A" && (
        <>
          <dt className="font-medium">Coor. Phone:</dt>
          <dd>{club.coord_phone}</dd>
        </>
      )}
    </dl>
  )
}
