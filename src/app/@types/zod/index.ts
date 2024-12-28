import { z } from 'zod'
import { loginFormSchema, registerFormSchema, sponsorSchema } from './schemas'

export type LoginFormData = z.infer<typeof loginFormSchema>
export type RegisterFormData = z.infer<typeof registerFormSchema>
export type SponsorFormData = z.infer<typeof sponsorSchema>
