'use client'
import { Movie, TVShow } from '@/app/@types/tmbd'
import MediaBox from '@/components/media-box'
import { Separator } from '@/components/ui/separator'
import { useCurrentBreakpoint } from '@/hooks/tailwind/use-current-breakpoint'
import useDebounce from '@/hooks/use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from './header'
import SearchingComponent from './searching-component'

interface PageComponentProps {
	popularMovies: Movie[]
	popularTVShows: TVShow[]
}
export default function PageComponent({
	popularMovies,
	popularTVShows,
}: PageComponentProps) {
	const currentBreakpoint = useCurrentBreakpoint()
	const currentPath = `/${window.location.href.split('/').slice(3).join('/')}`
	const router = useRouter()
	const pathname = usePathname()
	const params = new URLSearchParams(useSearchParams().toString())
	const urlQueryState = params.get('query')
	const [searchText, setSearchText] = useState(urlQueryState ?? '')
	const deboundedValue = useDebounce(searchText)
	const isDeboundedValueEmpty = deboundedValue.length === 0

	useEffect(() => {
		let newPath = '/'
		if (!isDeboundedValueEmpty) {
			console.log(deboundedValue)
			params.set('query', deboundedValue)
			newPath = `${pathname}?${params.toString()}`
		}

		if (currentPath !== newPath) {
			router.push(newPath)
		}
	}, [
		deboundedValue,
		isDeboundedValueEmpty,
		params,
		pathname,
		router,
		currentPath,
	])

	return (
		<>
			<Header
				searchInputConfig={{ inputValue: searchText, inputChange: setSearchText }}
			/>
			<main className="main mt-10 space-y-12 bg-app-black px-3">
				{isDeboundedValueEmpty && (
					<>
						<section className="section">
							<h4 className="mb-1 font-bold text-xl">
								<span>Filmes populares</span>
								<Separator className="h-1 max-w-36 bg-app-red" />
							</h4>
							<div className="scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-hide-arrows flex gap-4 overflow-x-auto">
								{popularMovies.map((movie: Movie) => {
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

						<section className="section">
							<h4 className="mb-1 font-bold text-xl">
								<span>Séries populares</span>
								<Separator className="h-1 max-w-36 bg-app-red" />
							</h4>
							<div className="scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-hide-arrows flex gap-4 overflow-x-auto">
								{popularTVShows.map((serie: TVShow) => {
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
