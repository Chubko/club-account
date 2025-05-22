"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ClubLayout } from "@/components/layout/club-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getClubProfile } from "@/lib/services/api"
import { Loader2, Edit } from "lucide-react"
import { EditClubModal } from "@/components/club/edit-club-modal"

export default function ClubProfilePage() {
  const searchParams = useSearchParams()
  const clubMasterId = Number(searchParams.get("club_master_id") || 1)

  const [club, setClub] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const fetchClubProfile = async () => {
    try {
      setLoading(true)
      const data = await getClubProfile(clubMasterId)
      setClub(data)
    } catch (err) {
      setError("Failed to load club profile")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClubProfile()
  }, [clubMasterId])

  const handleEditSuccess = () => {
    fetchClubProfile()
  }

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
      <ClubLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{club?.name || "Club Profile"}</h1>
            </div>
            <Button asChild variant="outline">
              <Link href={`/club/profile/account?club_master_id=${clubMasterId}`}>Modify Account</Link>
            </Button>
          </div>

          <div className="rounded-md border">
            <div className="bg-gray-200 text-black p-2 flex items-center">
              <div className="bg-gray-200 rounded-sm p-1 mr-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <span className="font-medium">Club Info:</span>
              <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-current hover:bg-black/10"
                  onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-medium">Club Name:</div>
                <div>{club?.name || "N/A"}</div>

                <div className="font-medium">USAV Region:</div>
                <div>{club?.usav_region || "N/A"}</div>

                <div className="font-medium">5dgt USAV Code:</div>
                <div>{club?.usav_code || "N/A"}</div>

                <div className="font-medium">Address:</div>
                <div>{club?.address || "N/A"}</div>

                <div className="font-medium">Address 2:</div>
                <div>{club?.address2 || "N/A"}</div>

                <div className="font-medium">City:</div>
                <div>{club?.city || "N/A"}</div>

                <div className="font-medium">State:</div>
                <div>{club?.state || "N/A"}</div>

                <div className="font-medium">ZIP:</div>
                <div>{club?.zip || "N/A"}</div>

                <div className="font-medium">Club Website:</div>
                <div>
                  {club?.website && club.website !== "N/A" ? (
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
                </div>

                <div className="font-medium">Office Phone:</div>
                <div>{club?.office_phone || "N/A"}</div>

                <div className="font-medium">Other Phone:</div>
                <div>{club?.other_phone || "N/A"}</div>

                <div className="font-medium">Fax:</div>
                <div>{club?.fax || "N/A"}</div>

                <div className="font-medium">E-mail:</div>
                <div>
                  {club?.email && club.email !== "N/A" ? (
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
                </div>

                <div className="font-medium">Sport Gender:</div>
                <div>{club?.sport_gender || "N/A"}</div>

                <div className="font-medium">Coor. First:</div>
                <div>{club?.coord_first || "N/A"}</div>

                <div className="font-medium">Coor. Last:</div>
                <div>{club?.coord_last || "N/A"}</div>

                <div className="font-medium">Coor. Email:</div>
                <div>
                  {club?.coord_email && club.coord_email !== "N/A" ? (
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
                  ) : (
                      "N/A"
                  )}
                </div>

                <div className="font-medium">Coor. Phone:</div>
                <div>{club?.coord_phone || "N/A"}</div>
              </div>
            </div>
          </div>
        </div>

        {club && (
            <EditClubModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                club={club}
                onSuccess={handleEditSuccess}
            />
        )}
      </ClubLayout>
  )
}
