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

	return (
		<>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{
					// biome-ignore lint/complexity/useOptionalChain:
					moviesData &&
						moviesData.movies &&
						moviesData.movies.map(movie => {
							return (
								<MediaBox
									key={`movie-${movie.id}`}
									mediaId={movie.id}
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
					seriesData &&
						seriesData.series &&
						seriesData.series.map(serie => {
							return (
								<MediaBox
									key={`serie-${serie.id}`}
									mediaId={serie.id}
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
		</>
	)
}
