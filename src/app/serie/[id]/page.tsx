import { Movie, MovieCredits, TVShow } from '@/app/@types/tmbd'
import { getUserAction } from '@/app/actions/get-user'
import { MediaDetails } from '@/components/media-details'
import { envSchema, envObject } from '@/env'
import { get } from '@/utils/tmdb/v2'

type PageParams = Promise<{ id: string }>

const env = envSchema.parse(envObject)

export default async function SeriePage({ params }: { params: PageParams }) {
	const { id } = await params
	const response = await get(
		`/tv/${id}?language=pt-BR&append_to_response=credits`,
		env.NEXT_PUBLIC_TMDB_TOKEN,
		{
			cache: 'force-cache',
			next: {
				revalidate: 1 * 60 * 60 * 24,
				tags: ['movie', `movie-${id}`],
			},
		}
	)
	const serie: TVShow = await response.json()
	const serieWithCredits = serie as unknown as TVShow & {
		credits: MovieCredits
	}
	const user = await getUserAction()

	console.log(serie)

	return (
		<>
			<MediaDetails
				user={user}
				id={serie.id}
				imdb_id={String(serie.id)}
				poster_path={serie.poster_path}
				title={serie.name}
				release_date={serie.first_air_date}
				overview={serie.overview}
				// runtime={serie.episode_run_time[0]}
				vote_average={serie.vote_average}
				createdBy={serie.created_by}
				credits={serieWithCredits.credits}
				genres={serie.genres}
			/>
		</>
	)
}
