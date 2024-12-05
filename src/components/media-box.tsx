'use client'
import { cn } from '@/lib/utils'
import ImageComponent from './image-component'

interface MediaBoxProps extends React.HTMLProps<HTMLDivElement> {
	title: string
	imgUrl: string
}

export default function MediaBox({
	title,
	imgUrl,
	className,
	...props
}: MediaBoxProps) {
	return (
		<div className={cn('relative w-fit', className)} {...props}>
			<ImageComponent
				width={0}
				height={0}
				sizes="600px"
				className="w-96 min-w-96"
				src={`https://image.tmdb.org/t/p/w500${imgUrl}`}
				alt={title}
			/>
			<div className="absolute bottom-0 flex w-full items-center justify-center bg-black/50 py-10 font-bold text-lg">
				{title}
			</div>
		</div>
	)
}
