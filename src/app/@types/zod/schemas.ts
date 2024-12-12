import { z } from 'zod'

export const loginFormSchema = z.object({
	username: z
		.string()
		.min(3, 'A senha deve ter pelo menos 3 caracteres.')
		.regex(
			/^(?![0-9])[^ ]+$/,
			'O nome de usuário não pode conter espaço em branco e não pode começar com número.'
		),
	password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
})
export const registerFormSchema = z.object({
	name: z.string().min(3, 'A senha deve ter pelo menos 3 caracteres.'),
	username: z
		.string()
		.min(3, 'A senha deve ter pelo menos 3 caracteres.')
		.regex(
			/^(?![0-9])[^ ]+$/,
			'O nome de usuário não pode conter espaço em branco e não pode começar com número.'
		),
	password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
})
