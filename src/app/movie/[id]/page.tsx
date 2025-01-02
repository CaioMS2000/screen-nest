import { Movie, MovieCredits } from '@/app/@types/tmbd'
import { getUserAction } from '@/app/actions/get-user'
import { MediaDetails } from '@/components/media-details'
import { envSchema, envObject } from '@/env'
import { get } from '@/utils/tmdb/v2'

type PageParams = Promise<{ id: string }>

const env = envSchema.parse(envObject)

export default async function MoviePage({ params }: { params: PageParams }) {
	const { id } = await params
	const response = await get(
		`/movie/${id}?language=pt-BR&append_to_response=credits`,
		env.NEXT_PUBLIC_TMDB_TOKEN,
		{
			cache: 'force-cache',
			next: {
				revalidate: 1 * 60 * 60 * 24,
				tags: ['movie', `movie-${id}`],
			},
		}
	)
	const movie: Movie = await response.json()
	const movieWithCredits = movie as unknown as Movie & {
		credits: MovieCredits
	}
	const user = await getUserAction()

	return (
		<>
			<MediaDetails
				user={user}
				id={movie.id}
				imdb_id={movie.imdb_id}
				poster_path={movie.poster_path}
				title={movie.title}
				release_date={movie.release_date}
				overview={movie.overview}
				runtime={movie.runtime}
				vote_average={movie.vote_average}
				credits={movieWithCredits.credits}
				genres={movie.genres}
			/>
		</>
	)
}
