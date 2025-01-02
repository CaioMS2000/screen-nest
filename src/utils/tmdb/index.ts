import { TMDB_BASE_URL } from '@/constants/http'
import { envObject, envSchema } from '@/env'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'

export type FetchOptions = {
	method?: string
	headers?: {
		accept: string
		Authorization: string
	}
} & RequestInit

const env = envSchema.parse(envObject)
const defaultOptions: FetchOptions = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_TOKEN}`,
	},
	cache: 'force-cache',
}

export function get(url: string, options: FetchOptions = {} as FetchOptions) {
	const optionsToUse = {
		...defaultOptions,
		...options,
	}
	const isUrlComplete = url.startsWith('http')
	const urlToFetch = isUrlComplete ? url : `${TMDB_BASE_URL}${url}`

	return fetch(urlToFetch, optionsToUse)
}
