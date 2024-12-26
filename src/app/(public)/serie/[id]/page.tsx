import { TVShow } from '@/app/@types/tmbd'
import { ArrowLeft03Icon } from '@/components/houstonicons/arrow-left'
import ImageComponent from '@/components/image-component'
import { get } from '@/utils/tmdb'
import { Chip } from '@nextui-org/react'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Link from 'next/link'
import { MediaDetailsPage } from './component'
import CookieManager from '@/utils/cookie-manager'
import { COOKIE_USERNAME } from '@/constants/http'
import { getUserAction } from '@/app/actions/get-user'

dayjs.locale(ptBR)

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
	console.log(show)

	return (
		<>
			<MediaDetailsPage serie={show} user={user} />
		</>
	)
}
