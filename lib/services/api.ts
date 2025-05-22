// API service for making requests to the backend

// Club Profile
export const getClubProfile = async (clubId = 1) => {
  const response = await fetch(`/api/club/profile?club_id=${clubId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch club profile")
  }
  return response.json()
}

export const getClubProfileById = async (clubId: number) => {
  const response = await fetch(`/api/club/profile/${clubId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch club profile")
  }
  return response.json()
}

export const updateClubProfile = async (data: any) => {
  const response = await fetch("/api/club/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update club profile")
  }
  return response.json()
}

// Teams
export const getTeams = async (clubId = 1) => {
  const response = await fetch(`/api/club/teams?club_id=${clubId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch teams")
  }
  return response.json()
}

export const getTeam = async (id: number) => {
  const response = await fetch(`/api/club/teams/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch team")
  }
  return response.json()
}

export const createTeam = async (data: any) => {
  const response = await fetch("/api/club/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create team")
  }
  return response.json()
}

export const updateTeam = async (id: number, data: any) => {
  const response = await fetch(`/api/club/teams/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update team")
  }
  return response.json()
}

export const deleteTeam = async (id: number) => {
  const response = await fetch(`/api/club/teams/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete team")
  }
  return response.json()
}

// Athletes
export const getAthletes = async (clubId = 1, teamId?: number) => {
  let url = `/api/club/athletes?club_id=${clubId}`
  if (teamId) {
    url += `&team_id=${teamId}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch athletes")
  }
  return response.json()
}

export const getAthlete = async (id: number) => {
  const response = await fetch(`/api/club/athletes/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch athlete")
  }
  return response.json()
}

export const createAthlete = async (data: any) => {
  const response = await fetch("/api/club/athletes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create athlete")
  }
  return response.json()
}

export const updateAthlete = async (id: number, data: any) => {
  const response = await fetch(`/api/club/athletes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update athlete")
  }
  return response.json()
}

export const deleteAthlete = async (id: number) => {
  const response = await fetch(`/api/club/athletes/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete athlete")
  }
  return response.json()
}

export const searchAthletes = async (params: Record<string, string>) => {
  const queryString = new URLSearchParams(params).toString()
  const response = await fetch(`/api/club/athletes/search?${queryString}`)
  if (!response.ok) {
    throw new Error("Failed to search athletes")
  }
  return response.json()
}

// Staff
export const getStaff = async (clubId = 1, teamId?: number) => {
  let url = `/api/club/staff?club_id=${clubId}`
  if (teamId) {
    url += `&team_id=${teamId}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch staff")
  }
  return response.json()
}

export const getStaffMember = async (id: number) => {
  const response = await fetch(`/api/club/staff/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch staff member")
  }
  return response.json()
}

export const createStaffMember = async (data: any) => {
  const response = await fetch("/api/club/staff", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create staff member")
  }
  return response.json()
}

export const updateStaffMember = async (id: number, data: any) => {
  const response = await fetch(`/api/club/staff/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to update staff member")
  }
  return response.json()
}

export const deleteStaffMember = async (id: number) => {
  const response = await fetch(`/api/club/staff/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete staff member")
  }
  return response.json()
}

// Tournaments
export const getTournaments = async () => {
  const response = await fetch("/api/club/tournaments")
  if (!response.ok) {
    throw new Error("Failed to fetch tournaments")
  }
  return response.json()
}

export const getTournament = async (id: number) => {
  const response = await fetch(`/api/club/tournaments/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch tournament")
  }
  return response.json()
}

export const getTournamentColleges = async (id: number) => {
  const response = await fetch(`/api/club/tournaments/${id}/colleges`)
  if (!response.ok) {
    throw new Error("Failed to fetch tournament colleges")
  }
  return response.json()
}

export const registerTeamForTournament = async (tournamentId: number, teamId: number) => {
  const response = await fetch(`/api/club/tournaments/${tournamentId}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ team_id: teamId }),
  })
  if (!response.ok) {
    throw new Error("Failed to register team for tournament")
  }
  return response.json()
}

// File Upload
export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload file")
  }

  return response.json()
}
