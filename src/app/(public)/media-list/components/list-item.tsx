import { Media } from '@/app/@types/entities/media'
import { fetchMovieAction } from '@/app/actions/fetch-movie'
import { useQuery } from '@tanstack/react-query'
import MediaManageBox from './media-manage-box'
import dayjs from 'dayjs'
import { useEffect } from 'react'

interface ListItemProps {
	media: Media
	list: 'watchlist' | 'watched'
}
export function ListItem({ media, list }: ListItemProps) {
	const { data, isFetching } = useQuery({
		queryFn: () => fetchMovieAction(media.imdbId),
		queryKey: [media.type, media.imdbId],
	})

	return (
		<>
			{data && data.sponsor && (
				<MediaManageBox
					key={`${media.type}-${data.movie.id}`}
					title={data.movie.title}
					imgUrl={data.movie.poster_path}
					type={media.type === 'MOVIE' ? 'movie' : 'serie'}
					mediaId={data.movie.id}
					imdbId={data.movie.imdb_id}
					release_date={data.movie.release_date}
					vote_average={data.movie.vote_average}
					sponsorDate={dayjs(data.sponsor.date).format('DD/MM/YYYY')}
					sponsorPrice={data.sponsor.price.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
					sponsor={data.sponsor.who}
					list={list}
				/>
			)}
		</>
	)
}
