'use client'
import { removeFromWatchlistAction } from '@/app/actions/remove-from-watchlist'
import { MinusSignSquareIcon } from '@/components/houstonicons/minus'
import { StarIcon } from '@/components/houstonicons/star'
import ImageComponent from '@/components/image-component'
import { Button, User } from '@nextui-org/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface MediaBoxProps extends React.HTMLProps<HTMLDivElement> {
	title: string
	imgUrl: string
	mediaId: number
	imdbId: string
	release_date: string
	sponsorDate: string
	sponsorPrice: string
	sponsor: string
	vote_average: number
	type: 'movie' | 'serie'
}

export default function MediaManageBox({
	title,
	imgUrl,
	className,
	type,
	mediaId,
	release_date,
	vote_average,
	sponsorDate,
	sponsorPrice,
	sponsor,
	imdbId,
	...props
}: MediaBoxProps) {
	const router = useRouter()

	const handleClick = () => {
		router.push(`/${type}/${mediaId}`)
	}

	async function handleRemove() {
		const response = await removeFromWatchlistAction(imdbId)

		if (response.success) {
			location.reload()
			toast.success('Removido da lista de observação com sucesso!')
		} else {
			toast.error('Falha ao remover da lista de observação.')
		}
	}

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents:
		<div
			onClick={handleClick}
			className="group flex cursor-pointer flex-col overflow-hidden rounded-lg bg-[#2a2a2a] transition-transform hover:scale-[1.02]"
		>
			<div id={`banner-${mediaId}`} className="aspect-[2/3]">
				<ImageComponent
					width={0}
					height={0}
					sizes="1000px"
					className="h-full w-full object-cover"
					src={`https://image.tmdb.org/t/p/w500${imgUrl}`}
					alt={title}
				/>
			</div>
			<div id={`info-${mediaId}`} className="flex-grow p-4 text-white">
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
			<div
				id={`action-${mediaId}`}
				className="flex flex-col justify-center bg-zinc-900 p-4"
			>
				<div className="mb-4">
					<p className="p text-gray-300">
						Dia: <span className="font-bold">{sponsorDate}</span>
					</p>
					<p className="p text-gray-300">
						Por: <span className="font-bold">{sponsor}</span>
					</p>
					<p className="p text-gray-300">
						Valor: <span className="font-bold">{sponsorPrice}</span>
					</p>
				</div>
				<Button
					color="danger"
					startContent={<MinusSignSquareIcon className="size-5 text-danger" />}
					variant="bordered"
					onPress={e => {
						console.log(e)
						console.log('remover')
						handleRemove()
					}}
				>
					<span className="font-bold">Remover</span>
				</Button>
			</div>
		</div>
	)
}
