import { TMDB_BASE_URL } from '@/constants/http'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'

export type FetchOptions = {
	method?: string
	headers?: {
		accept: string
		Authorization: string
	}
} & RequestInit

function buildOptions(token: string): FetchOptions {
	return {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		cache: 'force-cache',
	}
}

export function get(url: string, token: string) {
	const optionsToUse = buildOptions(token)
	const isUrlComplete = url.startsWith('http')
	const urlToFetch = isUrlComplete ? url : `${TMDB_BASE_URL}${url}`

	return fetch(urlToFetch, optionsToUse)
}
