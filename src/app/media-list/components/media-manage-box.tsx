import { removeMediaFromListAction } from '@/app/actions/remove-media-from-list'
import { MinusSignSquareIcon } from '@/components/houstonicons/minus'
import { StarIcon } from '@/components/houstonicons/star'
import ImageComponent from '@/components/image-component'
import { Button } from '@nextui-org/react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { toast } from 'sonner'

export interface MediaBoxData {
	imdbId: string
	title: string
	imgUrl: string
	mediaId: number
	release_date: string
	vote_average: number
	type: 'movie' | 'serie'
	list: ListTab
}

export type ListTab = 'watched' | 'watchList'

interface MediaBoxProps extends React.HTMLProps<HTMLDivElement> {
	boxData: MediaBoxData
}

export function MediaManageBox({
	className,
	boxData: {
		title,
		imgUrl,
		imdbId,
		type,
		list,
		release_date,
		vote_average,
		...props
	},
}: MediaBoxProps) {
	async function handleDelete() {
		const result = await removeMediaFromListAction(imdbId, list)

		if (!result.success) {
			toast.error('Erro ao remover da lista')
		} else {
			toast.success('Removido com sucesso')
		}
	}

	return (
		<div className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-lg bg-[#2a2a2a] transition-transform hover:scale-[1.02]">
			<Link href={`/${type}/${imdbId}`}>
				<div className="aspect-[2/3]">
					<ImageComponent
						width={0}
						height={0}
						sizes="600px"
						className="h-full w-full object-cover"
						src={`https://image.tmdb.org/t/p/w500${imgUrl}`}
						alt={title}
					/>
				</div>
				<div className="flex flex-grow flex-col p-4 text-white">
					<div className="flex items-start justify-between gap-2">
						<h3 className="font-semibold text-lg leading-tight">{title}</h3>
						<div className="flex items-center gap-1 text-yellow-500">
							<StarIcon className="size-5 text-yellow-400" />
							<span className="text-sm">{vote_average.toFixed(1)}</span>
						</div>
					</div>
					<div className="mt-1 flex items-center gap-2 text-gray-400 text-sm">
						<span>{type === 'movie' ? 'Filme' : 'Série'}</span>
						<span>•</span>
						<span>
							{Number.isNaN(dayjs(release_date).get('y'))
								? '?'
								: dayjs(release_date).get('y')}
						</span>
					</div>
				</div>
			</Link>
			<div className="flex flex-col bg-app-black p-4">
				<Button
					color="danger"
					startContent={<MinusSignSquareIcon className="size-5 text-danger" />}
					variant="bordered"
					onPress={handleDelete}
				>
					Remover
				</Button>
			</div>
		</div>
	)
}
