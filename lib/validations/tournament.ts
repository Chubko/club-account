import { z } from "zod"

export const tournamentSchema = z.object({
  name: z.string().min(1, "Tournament name is required"),
  start_date: z.string().or(z.date()),
  end_date: z.string().or(z.date()),
  location: z.string().optional(),
  description: z.string().optional(),
})

export const tournamentRegistrationSchema = z.object({
  team_id: z.number().int().positive(),
  tournament_id: z.number().int().positive(),
})

export type TournamentInput = z.infer<typeof tournamentSchema>
export type TournamentRegistrationInput = z.infer<typeof tournamentRegistrationSchema>
