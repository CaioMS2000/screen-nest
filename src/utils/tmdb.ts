import { TMDB_BASE_URL } from '@/constants/http'
import { env } from '@/env'

export type FetchOptions = {
	method: string
	headers: {
		accept: string
		Authorization: string
	}
}

const defaultOptions: FetchOptions = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${env.TMDB_TOKEN}`,
	},
}

export function get(url: string, options: FetchOptions = defaultOptions) {
	const isUrlComplete = url.startsWith('http')
	const urlToFetch = isUrlComplete ? url : `${TMDB_BASE_URL}${url}`

	return fetch(urlToFetch, options)
}
