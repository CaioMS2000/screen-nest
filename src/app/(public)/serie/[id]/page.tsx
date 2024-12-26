import { TVShow } from '@/app/@types/tmbd'
import { get } from '@/utils/tmdb'
import { MediaDetailsPage } from './component'
import CookieManager from '@/utils/cookie-manager'
import { COOKIE_USERNAME } from '@/constants/http'
import { getUserAction } from '@/app/actions/get-user'

interface PageParams {
	params: Promise<{ id: string }>
}

export default async function SeriePage({ params }: PageParams) {
	const _params = await params
	const { id } = _params
	const response = await get(`/tv/${id}`, {
		cache: 'force-cache',
		next: {
			revalidate: 1 * 60 * 60 * 24,
			tags: ['tv', `tv-${id}`],
		},
	})
	const show: TVShow = await response.json()
	const username = await CookieManager.getCookie(COOKIE_USERNAME)
	const user = await getUserAction(username?.value)

	return (
		<>
			<MediaDetailsPage serie={show} user={user} />
		</>
	)
}
