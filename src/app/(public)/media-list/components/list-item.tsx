import { Media } from '@/app/@types/entities/media'
import { fetchMovieAction } from '@/app/actions/fetch-movie'
import MediaBox from '@/components/media-box'
import { useQuery } from '@tanstack/react-query'

interface ListItemProps {
	media: Media
}
export function ListItem({ media }: ListItemProps) {
	const { data, isFetching } = useQuery({
		queryFn: () => fetchMovieAction(media.imdbId),
		queryKey: [media.type, media.imdbId],
	})

	return (
		<>
			{data && (
				<MediaBox
					key={`${media.type}-${data.id}`}
					title={data.title}
					imgUrl={data.poster_path}
					type={media.type === 'MOVIE' ? 'movie' : 'serie'}
					mediaId={data.id}
					release_date={data.release_date}
					vote_average={data.vote_average}
				/>
			)}
		</>
	)
}
