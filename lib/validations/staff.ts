import { z } from "zod"

export const staffSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  role: z.string().optional(),
  team_id: z.number().int().positive().optional(),
  club_id: z.number().int().positive(),
})

export type StaffInput = z.infer<typeof staffSchema>
