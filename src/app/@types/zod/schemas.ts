import { z } from 'zod'
import { MediaType } from '@/app/@types'

export const loginFormSchema = z.object({
	username: z
		.string()
		.min(3, 'A senha deve ter pelo menos 3 caracteres.')
		.regex(
			/^(?![0-9])[^ ]+$/,
			'O nome de usuário não pode conter espaço em branco e não pode começar com número.'
		),
	password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres.'),
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
	password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres.'),
})

export const sponsorSchema = z.object({
	name: z.string(),
	mediaId: z.string(),
	mediaType: z.custom<MediaType>(),
	imdbId: z.string(),
	price: z.string().regex(/^\d+(\.\d{2})?$/, 'Formato inválido'), // Ex: '10.50'
	date: z.string().date(),
})
