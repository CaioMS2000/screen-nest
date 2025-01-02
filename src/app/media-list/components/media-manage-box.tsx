import { StarIcon } from '@/components/houstonicons/star'
import ImageComponent from '@/components/image-component'
import dayjs from 'dayjs'
import Link from 'next/link'

export interface MediaBoxData {
	title: string
	imgUrl: string
	mediaId: number
	release_date: string
	vote_average: number
	type: 'movie' | 'serie'
}

interface MediaBoxProps extends React.HTMLProps<HTMLDivElement> {
	boxData: MediaBoxData
}

export function MediaManageBox({
	className,
	boxData: {
		title,
		imgUrl,
		type,
		mediaId,
		release_date,
		vote_average,
		...props
	},
}: MediaBoxProps) {
	return (
		<Link href={`/${type}/${mediaId}`}>
			<div className="group flex flex-col justify-between h-full cursor-pointer overflow-hidden rounded-lg bg-[#2a2a2a] transition-transform hover:scale-[1.02]">
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
				<div className="flex flex-col flex-grow p-4 text-white">
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
			</div>
		</Link>
	)
}
