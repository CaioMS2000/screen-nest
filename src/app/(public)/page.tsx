import { COOKIE_USERNAME } from '@/constants/http'
import { get } from '@/utils/tmdb'
import { cookies } from 'next/headers'
import PageComponent from './components/page-component'

export default async function Home() {
	const cookieStore = await cookies()
	const username = cookieStore.get(COOKIE_USERNAME)
	let url = '/tv/popular?language=en-US&page=1'
	let response = await get(url)
	const popularTVShows = await response.json()

	url = '/movie/popular?language=en-US&page=1'
	response = await get(url)
	const popularMovies = await response.json()

	return (
		<>
			<PageComponent
				usernameFromCookies={username?.value}
				popularTVShows={popularTVShows.results}
				popularMovies={popularMovies.results}
			/>
		</>
	)
}
