import { PopularMoviesSection } from '@/components/popular-movies'
import { Component } from './home-component'
import { PopularSeriesSection } from '@/components/popular-series'
import { fetchMoviesAction } from './actions/fetch-movies'
import { fetchSeriesAction } from './actions/fetch-series'
import { FetchMoviesResponse, FetchSeriesResponse } from './@types/http'

type PageParams = Promise<any>
type PageSearchParams = Promise<{
	[key: string]: string | undefined
}>

export default async function Home({
	params,
	searchParams,
}: { params: PageParams; searchParams: PageSearchParams }) {
	const p = await params
	const sp = await searchParams
	const query = sp.query
	let moviesResponse: FetchMoviesResponse | undefined
	let seriesResponse: FetchSeriesResponse | undefined

	if (query) {
		moviesResponse = await fetchMoviesAction(query)
		seriesResponse = await fetchSeriesAction(query)
	}

	return (
		<>
			<Component moviesResponse={moviesResponse} seriesResponse={seriesResponse}>
				<PopularMoviesSection />
				<div id="spacer" className="h-5 bg-transparent"></div>
				<PopularSeriesSection />
			</Component>
		</>
	)
}
