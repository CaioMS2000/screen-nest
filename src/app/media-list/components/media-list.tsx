'use client'

import { useState } from 'react'
import { MediaBoxData, MediaManageBox } from './media-manage-box'
import { CheckmarkSquare02Icon } from '@/components/houstonicons/check'
import { AlertCircleIcon } from '@/components/houstonicons/alert'
import { Clock01Icon } from '@/components/houstonicons/clock'
import { cn } from '@/lib/utils'

interface MediaListProps {
	watched: MediaBoxData[]
	watchList: MediaBoxData[]
}

type ListTab = 'watched' | 'watchList'

export default function MediaList({ watchList, watched }: MediaListProps) {
	const [tab, setTab] = useState<ListTab>('watchList')

	return (
		<div className="p-5">
			<div className="flex justify-center gap-5">
				<button
					className={cn(
						'mb-8 flex items-center gap-2 rounded-lg bg-app-red px-6 py-3 transition-colors hover:bg-app-red/50',
						{ 'bg-app-red/50': tab === 'watchList' }
					)}
					onClick={() => setTab('watchList')}
				>
					<Clock01Icon className="size-5 text-white" />
					<span>Para assistir</span>
				</button>
				<button
					className={cn(
						'mb-8 flex items-center gap-2 rounded-lg bg-yellow-500 px-6 py-3 transition-colors hover:bg-yellow-600',
						{ 'bg-yellow-600': tab === 'watched' }
					)}
					onClick={() => setTab('watched')}
				>
					<AlertCircleIcon className="size-5 text-white" />
					<span>Já assistidos</span>
				</button>
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{tab === 'watchList' &&
					watchList.map(media => (
						<MediaManageBox key={media.mediaId} boxData={media} />
					))}
				{tab === 'watched' &&
					watched.map(media => (
						<MediaManageBox key={media.mediaId} boxData={media} />
					))}
			</div>
		</div>
	)
}
