'use client'
import { getWatchedListAction } from '@/app/actions/get-watchedlist'
import { getWatchListAction } from '@/app/actions/get-watchlist'
import { CheckmarkSquare02Icon } from '@/components/houstonicons/check'
import { Clock01Icon } from '@/components/houstonicons/clock'
import { cn } from '@/lib/utils'
import { Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { WatchList } from './watch-list'
import { WatchedList } from './watched-list'

enum List {
	WATCHED = 'watched',
	WANT_TO_WATCH = 'want_to_watch',
}

interface MediaListProps {
	username?: string
}

export function MediaList({ username }: MediaListProps) {
	const [list, setList] = useState(List.WANT_TO_WATCH)
	const { data: watchListData } = useQuery({
		queryFn: () => getWatchListAction(String(username)),
		enabled: !!username && list === List.WANT_TO_WATCH,
		queryKey: ['watchlist', username],
	})
	const { data: watchedListData } = useQuery({
		queryFn: () => getWatchedListAction(String(username)),
		enabled: !!username && list === List.WATCHED,
		queryKey: ['watchedlist', username],
	})

	return (
		<>
			<div className="inline-flex w-full justify-center gap-10 pt-10">
				<Button
					className={cn('inline-flex items-center gap-2 bg-app-red', {
						'bg-app-red/40': list !== List.WANT_TO_WATCH,
					})}
					size="lg"
					onPress={() => setList(List.WANT_TO_WATCH)}
				>
					<Clock01Icon
						className={cn('size-5 text-white', {
							'text-zinc-500': list !== List.WANT_TO_WATCH,
						})}
					/>
					<span
						className={cn('font-bold', {
							'text-zinc-500': list !== List.WANT_TO_WATCH,
						})}
					>
						Para assistir
					</span>
				</Button>
				<Button
					className={cn('inline-flex items-center gap-2 bg-yellow-700', {
						'bg-yellow-700/40': list !== List.WATCHED,
					})}
					size="lg"
					onPress={() => setList(List.WATCHED)}
				>
					<CheckmarkSquare02Icon
						className={cn('size-5 text-white', {
							'text-zinc-500': list !== List.WATCHED,
						})}
					/>
					<span
						className={cn('font-bold', { 'text-zinc-500': list !== List.WATCHED })}
					>
						Já assistidos
					</span>
				</Button>
			</div>
			{list === List.WANT_TO_WATCH && watchListData && (
				<WatchList medias={watchListData} />
			)}
			{list === List.WATCHED && watchedListData && (
				<WatchedList medias={watchedListData} />
			)}
		</>
	)
}
