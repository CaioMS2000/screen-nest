'use client'
import { NotDetailedMovie, NotDetailedTVShow } from '@/app/@types/tmbd'
import MediaBox from '@/components/media-box'
import useDebounce from '@/hooks/use-debounce'
import { Spacer } from '@nextui-org/spacer'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from './header'
import SearchingComponent from './searching-component'

interface PageComponentProps {
	usernameFromCookies: string | undefined
	popularMovies: NotDetailedMovie[]
	popularTVShows: NotDetailedTVShow[]
}
export default function PageComponent({
	popularMovies,
	popularTVShows,
	usernameFromCookies,
}: PageComponentProps) {
	const router = useRouter()
	const pathname = usePathname()
	const params = new URLSearchParams(useSearchParams().toString())
	const urlQueryState = params.get('query')
	const [searchText, setSearchText] = useState(urlQueryState ?? '')
	const deboundedValue = useDebounce(searchText)
	const isDeboundedValueEmpty = deboundedValue.length === 0

	useEffect(() => {
		const newParams = new URLSearchParams()
		if (!isDeboundedValueEmpty) {
			if (!urlQueryState || urlQueryState !== deboundedValue) {
				newParams.set('query', deboundedValue)
				router.push(`${pathname}?${newParams.toString()}`)
			}
		} else {
			if (params.size > 0) {
				router.push(`${pathname}`)
			}
		}
	}, [
		isDeboundedValueEmpty,
		params,
		router,
		urlQueryState,
		deboundedValue,
		pathname,
	])

	return (
		<>
			<Header
				searchInputConfig={{ inputValue: searchText, inputChange: setSearchText }}
				usernameFromCookies={usernameFromCookies}
			/>
			<main className="main mt-10 space-y-12 bg-app-black-500 px-3 pb-10">
				{isDeboundedValueEmpty && (
					<>
						<section className="space-y-5">
							<h4 className="mb-1 font-bold text-xl">
								<span>Filmes populares</span>
								<Spacer className="h-1 w-full max-w-36 bg-app-red" />
							</h4>
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
								{popularMovies.map(movie => {
									return (
										<MediaBox
											key={`movie-${movie.id}`}
											title={movie.title}
											imgUrl={movie.poster_path}
											type="movie"
											mediaId={movie.id}
											release_date={movie.release_date}
											vote_average={movie.vote_average}
										/>
									)
								})}
							</div>
						</section>

						<section className="space-y-5">
							<h4 className="mb-1 font-bold text-xl">
								<span>Séries populares</span>
								<Spacer className="h-1 w-full max-w-36 bg-app-red" />
							</h4>
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
								{popularTVShows.map(serie => {
									return (
										<MediaBox
											key={`serie-${serie.id}`}
											title={serie.name}
											imgUrl={serie.poster_path}
											type="serie"
											mediaId={serie.id}
											release_date={serie.first_air_date}
											vote_average={serie.vote_average}
										/>
									)
								})}
							</div>
						</section>
					</>
				)}
				{!isDeboundedValueEmpty && <SearchingComponent query={deboundedValue} />}
			</main>
		</>
	)
}
