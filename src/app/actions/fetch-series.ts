'use server'
import { get } from '@/utils/tmdb'

export async function fetchSeriesAction(query: string) {
	const response = await get(`/search/tv?query=${query}&language=pt-BR`, {
		cache: 'force-cache',
		next: {
			revalidate: 1 * 60 * 60 * 24,
			tags: ['series', 'series-query', query],
		},
	})

	const data = await response.json()
	const pre = {
		page: data.page,
		totalPages: data.total_pages,
		totalResults: data.total_results,
		series: data.results,
	}

	return pre
}
