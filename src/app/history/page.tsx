import { get } from '@/utils/tmdb'
import { Sponsorship } from '../@types'
import { Movie, TVShow } from '../@types/tmbd'
import { getMediaAction } from '../actions/get-media'
import { getUserSponsorshipsAction } from '../actions/get-user-sponsorships'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import History from './components/history'
import { isMovie, isSerie } from '@/utils'

dayjs.locale(ptBR)

type PageParams = Promise<any>

export default async function HistoryPage({ params }: { params: PageParams }) {
	const sponsorships = await getUserSponsorshipsAction()
	const sponsorshipsData: Sponsorship[] = []

	for (const sponsorship of sponsorships) {
		const media = await getMediaAction(sponsorship.mediaImdbId)
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
			const pre = {
				id: `${data.id}`,
				media: {
					title: data.title,
					posterUrl: data.poster_path,
				},
				donatedBy: sponsorship.who,
				amount: sponsorship.price,
				date: dayjs(sponsorship.date).toDate(),
				status: 'pending',
			}

			sponsorshipsData.push(pre)
		} else if (isSerie(data, media.type)) {
			const pre = {
				id: `${data.id}`,
				media: {
					title: data.name,
					posterUrl: data.poster_path,
				},
				donatedBy: sponsorship.who,
				amount: sponsorship.price,
				date: dayjs(sponsorship.date).toDate(),
				status: 'pending',
			}

			sponsorshipsData.push(pre)
		}
	}

	return (
		<>
			<History sponsorships={sponsorshipsData} />
		</>
	)
}
