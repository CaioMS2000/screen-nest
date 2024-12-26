import { Media } from '@/app/@types/entities/media'
import { ListItem } from './list-item'

interface WatchedListProps {
	medias: Media[]
}

export function WatchedList({ medias }: WatchedListProps) {
	return (
		<>
			<div className="mt-10 mb-3 h-1 w-full bg-green-500"></div>
			<div className="mt-10 grid grid-cols-2 gap-4 px-2 md:grid-cols-3 lg:grid-cols-4">
				{medias.map(media => {
					return <ListItem key={media.id} media={media} />
				})}
			</div>
		</>
	)
}
