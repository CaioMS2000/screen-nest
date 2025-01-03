import { isMovie, isSerie } from '@/utils'
import { get } from '@/utils/tmdb'
import { Movie, TVShow } from '../@types/tmbd'
import { getUserWatchedAction } from '../actions/get-user-watched'
import { getUserWatchListAction } from '../actions/get-user-watchlist'
import MediaList, { MediaBoxProps } from './components/media-list'
import { getMediaAction } from '../actions/get-media'

type PageParams = Promise<any>

export default async function MediaListPage({
	params,
}: { params: PageParams }) {
	const watchedMedias = await getUserWatchedAction()
	const watchListMedias = await getUserWatchListAction()
	const watched: MediaBoxProps[] = []
	const watchList: MediaBoxProps[] = []

	for (const watchedMedia of watchedMedias) {
		const media = await getMediaAction(watchedMedia.mediaImdbId)
		const mediaDomain = media.type === 'MOVIE' ? 'movie' : 'tv'
		const response = await get(
			`/${mediaDomain}/${media.imdbId}?language=pt-BR&append_to_response=credits`,
			{
				cache: 'force-cache',
				next: {
					revalidate: 1 * 60 * 60 * 24,
					tags: [`${mediaDomain}`, `${mediaDomain}-${media.imdbId}`],
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

	for (const watchlistMedia of watchListMedias) {
		const media = await getMediaAction(watchlistMedia.mediaImdbId)
		const mediaDomain = media.type === 'MOVIE' ? 'movie' : 'tv'
		const response = await get(
			`/${mediaDomain}/${media.imdbId}?language=pt-BR&append_to_response=credits`,
			{
				cache: 'force-cache',
				next: {
					revalidate: 1 * 60 * 60 * 24,
					tags: [`${mediaDomain}`, `${mediaDomain}-${media.imdbId}`],
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
