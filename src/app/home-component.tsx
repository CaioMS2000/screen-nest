'use client'
import { Search01Icon } from '@/components/houstonicons/search'
import useDebounce from '@/hooks/use-debounce'
import { Input } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FetchMoviesResponse, FetchSeriesResponse } from './@types/http'
import { MediaBox } from '@/components/media-box'

type ComponenteProps = {
	children?: React.ReactNode
	moviesResponse: FetchMoviesResponse | undefined
	seriesResponse: FetchSeriesResponse | undefined
}

export function Component({
	children,
	moviesResponse,
	seriesResponse,
}: ComponenteProps) {
	const router = useRouter()
	const pathname = usePathname()
	const params = new URLSearchParams(useSearchParams().toString())
	const urlQueryState = params.get('query')
	const [searchText, setSearchText] = useState(urlQueryState ?? '')
	const deboundedValue = useDebounce(searchText)
	const isDeboundedValueEmpty = deboundedValue.length === 0

	useEffect(() => {
		const newParams = new URLSearchParams(params)
		if (!isDeboundedValueEmpty) {
			if (!urlQueryState || urlQueryState !== deboundedValue) {
				newParams.set('query', deboundedValue)
				router.push(`${pathname}?${newParams.toString()}`)
			}
		} else {
			newParams.delete('query')

			if (params.toString() !== newParams.toString()) {
				router.push(`${pathname}?${newParams.toString()}`)
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
			<main>
				<Input
					className="mx-auto mt-7 w-[500px] placeholder:font-bold placeholder:text-white"
					placeholder="Pesquisar..."
					size="lg"
					startContent={<Search01Icon className="size-5 text-white" />}
					isClearable
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
				/>
				<div className="div"></div>
				{isDeboundedValueEmpty && children && (
					<div className="mt-10 px-2">{children}</div>
				)}
				{!isDeboundedValueEmpty && (
					<div className="mt-10 grid grid-cols-1 gap-6 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
						{
							// biome-ignore lint/complexity/useOptionalChain:
							moviesResponse &&
								moviesResponse.movies.map(movie => {
									return (
										<MediaBox
											key={`movie-${movie.id}`}
											mediaId={String(movie.id)}
											title={movie.title}
											imgUrl={movie.poster_path}
											release_date={movie.release_date}
											vote_average={movie.vote_average}
											type="movie"
											className="mx-auto"
										/>
									)
								})
						}
						{
							// biome-ignore lint/complexity/useOptionalChain:
							seriesResponse &&
								seriesResponse.series.map(serie => {
									return (
										<MediaBox
											key={`serie-${serie.id}`}
											mediaId={String(serie.id)}
											title={serie.name}
											imgUrl={serie.poster_path}
											release_date={serie.first_air_date}
											vote_average={serie.vote_average}
											type="serie"
										/>
									)
								})
						}
					</div>
				)}
			</main>
		</>
	)
}
