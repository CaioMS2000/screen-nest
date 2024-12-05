import { FetchMoviesResponse, FetchSeriesResponse } from '@/app/@types/http'
import { fetchMovies, fetchSeries } from '@/app/actions'
import MediaBox from '@/components/media-box'
import { get } from '@/utils/tmdb'
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
			console.log(moviesData)
		}
	}, [moviesData, moviesIsFetched])

	useEffect(() => {
		if (seriesIsFetched) {
			console.log(seriesData)
		}
	}, [seriesData, seriesIsFetched])

	return (
		<>
			<div className="div">
				{moviesData &&
					moviesData.movies.map(movie => {
						return (
							<MediaBox
								key={movie.id}
								title={movie.title}
								imgUrl={movie.poster_path}
							/>
						)
					})}
				{seriesData &&
					seriesData.series.map(serie => {
						return (
							<MediaBox key={serie.id} title={serie.name} imgUrl={serie.poster_path} />
						)
					})}
			</div>
		</>
	)
}
