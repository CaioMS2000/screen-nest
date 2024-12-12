'use server'
import { get } from '@/utils/tmdb'
import { FetchMoviesResponse, FetchSeriesResponse } from '../@types/http'

export async function fetchMovies(query: string): Promise<FetchMoviesResponse> {
	const response = await get(`/search/movie?query=${query}&language=pt-BR`, {
		//  cache: 'force-cache',
		//  next: {
		// 	 revalidate: 1 * 60 * 60,
		// 	 tags: ['movie', `movie-${query}`]
		//  }
		// nesse caso em específico o cache está sendo feito por lib externa
	})
	const data = await response.json()
	return {
		page: data.page,
		totalPages: data.total_pages,
		totalResults: data.total_results,
		movies: data.results,
	}
}

export async function fetchSeries(query: string): Promise<FetchSeriesResponse> {
	const response = await get(`/search/tv?query=${query}&language=pt-BR`, {
		// cache: 'force-cache',
		// next: {
		// 	revalidate: 1 * 60 * 60,
		// 	tags: ['tv', `tv-${query}`]
		// },
		// nesse caso em específico o cache está sendo feito por lib externa
	})
	const data = await response.json()
	return {
		page: data.page,
		totalPages: data.total_pages,
		totalResults: data.total_results,
		series: data.results,
	}
}
