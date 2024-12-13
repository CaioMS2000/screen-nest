'use client'
import { NotDetailedMovie, NotDetailedTVShow } from '@/app/@types/tmbd'
import MediaBox from '@/components/media-box'
import { useCurrentBreakpoint } from '@/hooks/tailwind/use-current-breakpoint'
import useDebounce from '@/hooks/use-debounce'
import { Spacer } from '@nextui-org/spacer'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from './header'
import SearchingComponent from './searching-component'

interface PageComponentProps {
	popularMovies: NotDetailedMovie[]
	popularTVShows: NotDetailedTVShow[]
}
export default function PageComponent({
	popularMovies,
	popularTVShows,
}: PageComponentProps) {
	const currentBreakpoint = useCurrentBreakpoint()
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
			/>
			<main className="main mt-10 space-y-12 bg-app-black-500 px-3">
				{isDeboundedValueEmpty && (
					<>
						<section className="space-y-5">
							<h4 className="mb-1 font-bold text-xl">
								<span>Filmes populares</span>
								<Spacer className="h-1 w-full max-w-36 bg-app-red" />
							</h4>
							<div className="grid grid-cols-3 gap-y-5 justify-items-center">
								{popularMovies.map((movie: NotDetailedMovie) => {
									return (
										<MediaBox
											key={movie.id}
											title={movie.title}
											imgUrl={movie.poster_path}
											type="movie"
											mediaId={movie.id}
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
							<div className="grid grid-cols-3 gap-y-5 justify-items-center">
								{popularTVShows.map((serie: NotDetailedTVShow) => {
									return (
										<MediaBox
											key={serie.id}
											title={serie.name}
											imgUrl={serie.poster_path}
											type="serie"
											mediaId={serie.id}
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
