'use server'

import { get } from '@/utils/tmdb'
import { Movie } from '../@types/tmbd'

export async function fetchMovieAction(id: string) {
	const response = await get(`/movie/${id}?language=pt-BR`)
	const data: Movie = await response.json()

	return data
}
