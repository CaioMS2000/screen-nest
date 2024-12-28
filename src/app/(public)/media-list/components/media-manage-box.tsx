'use client'
import { MinusSignSquareIcon } from '@/components/houstonicons/minus'
import { StarIcon } from '@/components/houstonicons/star'
import ImageComponent from '@/components/image-component'
import { Button, User } from '@nextui-org/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

interface MediaBoxProps extends React.HTMLProps<HTMLDivElement> {
	title: string
	imgUrl: string
	mediaId: number
	release_date: string
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
	...props
}: MediaBoxProps) {
	const router = useRouter()

	const handleClick = () => {
		router.push(`/${type}/${mediaId}`)
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
				className="flex justify-center bg-zinc-900 p-4"
			>
				<Button
					color="danger"
					startContent={<MinusSignSquareIcon className="size-5 text-danger" />}
					variant="bordered"
					onPress={e => {
						console.log(e)
						console.log('remover')
					}}
				>
					<span className="font-bold">Remover</span>
				</Button>
			</div>
		</div>
	)
}
