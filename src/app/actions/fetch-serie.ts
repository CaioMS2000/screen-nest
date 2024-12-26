import { get } from '@/utils/tmdb'
import { TVShow } from '../@types/tmbd'

export async function fetchSerieAction(id: string) {
	const response = await get(`/tv/${id}?language=pt-BR`)
	const data: TVShow = await response.json()

	return data
}
