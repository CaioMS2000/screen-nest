'use server'
import { get } from '@/utils/tmdb'
import { FetchMoviesResponse, FetchSeriesResponse } from './@types/http'

export async function fetchMovies(query: string): Promise<FetchMoviesResponse> {
	const response = await get(`/search/movie?query=${query}&language=pt-BR`)
	const data = await response.json()
	return {
		page: data.page,
		totalPages: data.total_pages,
		totalResults: data.total_results,
		movies: data.results,
	}
}

export async function fetchSeries(query: string): Promise<FetchSeriesResponse> {
	const response = await get(`/search/tv?query=${query}&language=pt-BR`)
	const data = await response.json()
	return {
		page: data.page,
		totalPages: data.total_pages,
		totalResults: data.total_results,
		series: data.results,
	}
}
