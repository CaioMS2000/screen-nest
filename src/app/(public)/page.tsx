import { get } from '@/utils/tmdb'
import PageComponent from './components/page-component'

export default async function Home() {
	let url = '/tv/popular?language=en-US&page=1'
	let response = await get(url)
	const popularTVShows = await response.json()

	url = '/movie/popular?language=en-US&page=1'
	response = await get(url)
	const popularMovies = await response.json()

	return (
		<>
			<PageComponent
				popularTVShows={popularTVShows.results}
				popularMovies={popularMovies.results}
			/>
		</>
	)
}
