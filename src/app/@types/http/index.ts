import { NotDetailedMovie, NotDetailedTVShow } from '../tmbd'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

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

export type CookieType = RequestCookie[]
