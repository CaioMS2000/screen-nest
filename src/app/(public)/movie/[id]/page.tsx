import { Movie } from '@/app/@types/tmbd'
import { ArrowLeft03Icon } from '@/components/houstonicons/arrow-left'
import ImageComponent from '@/components/image-component'
import MediaBox from '@/components/media-box'
import { get } from '@/utils/tmdb'
import { Chip } from '@nextui-org/chip'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Link from 'next/link'
import { MediaDetailsPage } from './component'

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
	const data: Movie = await response.json()

	return <MediaDetailsPage movie={data} />
}
