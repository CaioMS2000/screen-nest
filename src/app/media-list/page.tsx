import { isMovie, isSerie } from '@/utils'
import { get } from '@/utils/tmdb'
import { Movie, TVShow } from '../@types/tmbd'
import { getUserWatchedAction } from '../actions/get-user-watched'
import { getUserWatchListAction } from '../actions/get-user-watchlist'
import MediaList, { MediaBoxProps } from './components/media-list'

type PageParams = Promise<any>

export default async function MediaListPage({
	params,
}: { params: PageParams }) {
	const watchedMedia = await getUserWatchedAction()
	const watchListMedia = await getUserWatchListAction()
	const watched: MediaBoxProps[] = []
	const watchList: MediaBoxProps[] = []

	for (const media of watchedMedia) {
		const mediaDomain = media.type === 'MOVIE' ? 'movie' : 'tv'
		const response = await get(
			`/${mediaDomain}/${media.imdbId}?language=pt-BR&append_to_response=credits`,
			{
				cache: 'force-cache',
				next: {
					revalidate: 1 * 60 * 60 * 24,
					tags: [`${mediaDomain}`, `${mediaDomain}-${media.id}`],
				},
			}
		)
		const data: TVShow | Movie = await response.json()

		if (isMovie(data, media.type)) {
			const pre: MediaBoxProps = {
				imdbId: media.imdbId,
				imgUrl: data.poster_path,
				title: data.title,
				mediaId: data.id,
				release_date: data.release_date,
				vote_average: data.vote_average,
				type: 'movie',
			}

			watched.push(pre)
		} else if (isSerie(data, media.type)) {
			const pre: MediaBoxProps = {
				imdbId: media.imdbId,
				imgUrl: data.poster_path,
				title: data.name,
				mediaId: data.id,
				release_date: data.first_air_date,
				vote_average: data.vote_average,
				type: 'serie',
			}

			watched.push(pre)
		}
	}

	for (const media of watchListMedia) {
		const mediaDomain = media.type === 'MOVIE' ? 'movie' : 'tv'
		const response = await get(
			`/${mediaDomain}/${media.imdbId}?language=pt-BR&append_to_response=credits`,
			{
				cache: 'force-cache',
				next: {
					revalidate: 1 * 60 * 60 * 24,
					tags: [`${mediaDomain}`, `${mediaDomain}-${media.id}`],
				},
			}
		)
		const data: TVShow | Movie = await response.json()

		if (isMovie(data, media.type)) {
			const pre: MediaBoxProps = {
				imdbId: media.imdbId,
				imgUrl: data.poster_path,
				title: data.title,
				mediaId: data.id,
				release_date: data.release_date,
				vote_average: data.vote_average,
				type: 'movie',
			}

			watchList.push(pre)
		} else if (isSerie(data, media.type)) {
			const pre: MediaBoxProps = {
				imdbId: media.imdbId,
				imgUrl: data.poster_path,
				title: data.name,
				mediaId: data.id,
				release_date: data.first_air_date,
				vote_average: data.vote_average,
				type: 'serie',
			}

			watchList.push(pre)
		}
	}

	return (
		<>
			<MediaList watched={watched} watchList={watchList} />
		</>
	)
}
