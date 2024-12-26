import { Movie } from '@/app/@types/tmbd'
import { get } from '@/utils/tmdb'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { MediaDetailsPage } from './component'
// import { CookieManager } from '@/utils/cookie-manager'
import { COOKIE_USERNAME } from '@/constants/http'
import CookieManager from '@/utils/cookie-manager'
import { getUserAction } from '@/app/actions/get-user'

dayjs.locale(ptBR)

interface PageParams {
	params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: PageParams) {
	const _params = await params
	const { id } = _params
	const response = await get(
		`/movie/${id}?language=pt-BR&append_to_response=credits`,
		{
			cache: 'force-cache',
			next: {
				revalidate: 1 * 60 * 60 * 24,
				tags: ['movie', `movie-${id}`],
			},
		}
	)
	const movie: Movie = await response.json()
	const username = await CookieManager.getCookie(COOKIE_USERNAME)
	const user = await getUserAction(username?.value)

	return <MediaDetailsPage movie={movie} user={user} />
}
