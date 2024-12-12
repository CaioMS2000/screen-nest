import { NotDetailedMovie, NotDetailedTVShow } from '../tmbd'

export interface FetchMoviesResponse {
	page: number
	totalPages: number
	totalResults: number
	movies: NotDetailedMovie[]
}

export interface FetchSeriesResponse {
	page: number
	totalPages: number
	totalResults: number
	series: NotDetailedTVShow[]
}
