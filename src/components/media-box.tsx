import dayjs from 'dayjs'
import { StarIcon } from './houstonicons/star'
import ImageComponent from './image-component'
import Link from 'next/link'

interface MediaBoxProps extends React.HTMLProps<HTMLDivElement> {
	title: string
	imgUrl: string
	mediaId: string
	release_date: string
	vote_average: number
	type: 'movie' | 'serie'
}

export function MediaBox({
	title,
	imgUrl,
	className,
	type,
	mediaId,
	release_date,
	vote_average,
	...props
}: MediaBoxProps) {
	return (
		<Link href={`/${type}/${mediaId}`}>
			<div className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-lg bg-[#2a2a2a] transition-transform hover:scale-[1.02]">
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
				<div className="flex flex-grow flex-col justify-end p-4 text-white">
					<div className="flex items-start justify-between gap-2">
						<h3 className="font-semibold text-sm md:text-lg leading-tight">
							{title}
						</h3>
						<div className="flex items-center gap-1 text-yellow-500">
							<StarIcon className="size-3 md:size-5 text-yellow-400" />
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
