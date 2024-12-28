import { Media } from '@/app/@types/entities/media'
import { ListItem } from './list-item'

interface WatchListProps {
	medias: Media[]
}

export function WatchList({ medias }: WatchListProps) {
	return (
		<>
			<div className="mt-10 mb-3 h-1 w-full bg-app-red"></div>
			<div className="grid grid-cols-2 gap-4 px-2 md:grid-cols-3 lg:grid-cols-4">
				{medias.map(media => {
					return <ListItem key={media.id} media={media} list="watchlist" />
				})}
			</div>
		</>
	)
}
