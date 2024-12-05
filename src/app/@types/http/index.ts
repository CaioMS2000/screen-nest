import { Movie, TVShow } from '../tmbd'

export interface FetchMoviesResponse {
	page: number
	totalPages: number
	totalResults: number
	movies: Movie[]
}

export interface FetchSeriesResponse {
	page: number
	totalPages: number
	totalResults: number
	series: TVShow[]
}
