import { z } from 'zod'

export const envSchema = z.object({
	NEXT_PUBLIC_TMDB_TOKEN: z.string(),
	MODE: z.enum(['development', 'production', 'test']).default('development'),
})

export const envObject = {
	NEXT_PUBLIC_TMDB_TOKEN: process.env.NEXT_PUBLIC_TMDB_TOKEN,
}
// export const env = envSchema.parse(process.env)
