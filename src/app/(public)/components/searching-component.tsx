'use client'
import { FetchMoviesResponse, FetchSeriesResponse } from '@/app/@types/http'
import { fetchMovies, fetchSeries } from '@/app/actions'
import MediaBox from '@/components/media-box'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

interface SearchingComponentProps {
	query: string
}

export default function SearchingComponent({ query }: SearchingComponentProps) {
	const { data: moviesData, isFetched: moviesIsFetched } =
		useQuery<FetchMoviesResponse>({
			queryKey: ['search-movies', query],
			queryFn: () => fetchMovies(query),
			// staleTime: 1000 * 60 * 6,
			staleTime: 1000 * 5,
			enabled: query.length > 0,
		})

	const { data: seriesData, isFetched: seriesIsFetched } =
		useQuery<FetchSeriesResponse>({
			queryKey: ['search-series', query],
			queryFn: () => fetchSeries(query),
			// staleTime: 1000 * 60 * 6,
			staleTime: 1000 * 5,
			enabled: query.length > 0,
		})

	useEffect(() => {
		if (moviesIsFetched) {
			// console.log(moviesData)
		}
	}, [moviesData, moviesIsFetched])

	useEffect(() => {
		if (seriesIsFetched) {
			// console.log(seriesData)
		}
	}, [seriesData, seriesIsFetched])

	return (
		<>
			<div className="grid grid-cols-1 gap-x-1 gap-y-3 bg-transparent md:grid-cols-2 md:gap-y-5 lg:grid-cols-3 lg:gap-y-8 xl:grid-cols-4">
				{
					// biome-ignore lint/complexity/useOptionalChain:
					moviesData &&
						moviesData.movies &&
						moviesData.movies.map(movie => {
							return (
								<MediaBox
									key={movie.id}
									mediaId={movie.id}
									title={movie.title}
									imgUrl={movie.poster_path}
									type="movie"
									className="mx-auto"
								/>
							)
						})
				}
				{
					// biome-ignore lint/complexity/useOptionalChain:
					seriesData &&
						seriesData.series &&
						seriesData.series.map(serie => {
							return (
								<MediaBox
									key={serie.id}
									mediaId={serie.id}
									title={serie.name}
									imgUrl={serie.poster_path}
									type="serie"
								/>
							)
						})
				}
			</div>
		</>
	)
}
