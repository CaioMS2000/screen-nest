import { NotDetailedMovie } from '@/app/@types/tmbd'
import { get } from '@/utils/tmdb/v2'
import { MediaBox } from './media-box'
import { envSchema } from '@/env'

export const env = envSchema.parse({
	NEXT_PUBLIC_TMDB_TOKEN: process.env.NEXT_PUBLIC_TMDB_TOKEN,
})

export async function PopularMoviesSection() {
	const url = '/movie/popular?language=en-US&page=1'
	const response = await get(url, env.NEXT_PUBLIC_TMDB_TOKEN)
	const popularMovies: { results: NotDetailedMovie[] } = await response.json()

	return (
		<>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{popularMovies.results.map(movie => {
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
		</>
	)
}
