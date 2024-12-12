import { Movie } from '@/app/@types/tmbd'
import { ArrowLeft03Icon } from '@/components/houstonicons/arrow-left'
import ImageComponent from '@/components/image-component'
import MediaBox from '@/components/media-box'
import { get } from '@/utils/tmdb'
import { Chip } from '@nextui-org/chip'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Link from 'next/link'

dayjs.locale(ptBR)

interface PageParams {
	params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: PageParams) {
	const _params = await params
	const { id } = _params
	const response = await get(`/movie/${id}?language=pt-BR`)
	const data: Movie = await response.json()

	return (
		<>
			<Link
				href={'/'}
				className="mb-5 inline-flex items-center p-2 font-bold text-xl"
			>
				<ArrowLeft03Icon className="size-10 text-white" /> Início
			</Link>
			<div className="grid grid-cols-2">
				<main className="main w-fit pl-2">
					<ImageComponent
						width={0}
						height={0}
						sizes="1000px"
						className="-ml-2 min-w-96"
						src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
						alt={data.title}
					/>
					<div className="flex flex-wrap justify-center gap-2 py-2">
						{data.genres.map(genre => (
							<Chip key={genre.id}>{genre.name}</Chip>
						))}
					</div>
					<h1 className="font-bold text-xl">{data.title}</h1>
					{data.status === 'Released' && (
						<p className="p">
							<span className="font-semibold">Data de lançamento</span>:{' '}
							{dayjs(data.release_date).format('DD[ de ]MMMM[ de ]YYYY')}
						</p>
					)}
					<p className="p">
						<span className="font-semibold">Nota</span>: {data.vote_average}
					</p>
					<p className="p">
						<span className="font-semibold">Origem</span>: {data.origin_country}
					</p>
				</main>
				<aside className="aside"></aside>
			</div>
		</>
	)
}
