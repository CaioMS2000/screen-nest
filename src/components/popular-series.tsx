import { NotDetailedTVShow } from '@/app/@types/tmbd'
import { envSchema } from '@/env'
import { get } from '@/utils/tmdb/v2'
import { MediaBox } from './media-box'

export const env = envSchema.parse({
	NEXT_PUBLIC_TMDB_TOKEN: process.env.NEXT_PUBLIC_TMDB_TOKEN,
})

export async function PopularSeriesSection() {
	const url = '/tv/popular?language=en-US&page=1'
	const response = await get(url, env.NEXT_PUBLIC_TMDB_TOKEN)
	const popularSeries: { results: NotDetailedTVShow[] } = await response.json()

	return (
		<>
			<h4 className="mb-4 w-fit space-y-2 font-bold text-2xl text-white">
				<span className="span">Séries Populares</span>
				<div className="h-1 w-full bg-app-red"></div>
			</h4>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{popularSeries.results.map(serie => {
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
		</>
	)
}
