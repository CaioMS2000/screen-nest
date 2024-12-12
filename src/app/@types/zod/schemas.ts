import { z } from 'zod'

export const loginFormSchema = z.object({
	username: z.string().min(3, 'A senha deve ter pelo menos 3 caracteres.'),
	password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
})

export const registerFormSchema = z.object({
	name: z.string().min(3, 'A senha deve ter pelo menos 3 caracteres.'),
	username: z.string().min(3, 'A senha deve ter pelo menos 3 caracteres.'),
	password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
})
