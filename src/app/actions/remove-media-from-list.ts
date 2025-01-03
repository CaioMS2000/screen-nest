'use server'

import { revalidatePath } from 'next/cache'
import { getUserWatchedAction } from './get-user-watched'
import { getUserWatchListAction } from './get-user-watchlist'
import { getMediaAction } from './get-media'
import { prisma } from '@/lib/prisma'

type List = 'watched' | 'watchList'

export async function removeMediaFromListAction(imdbId: string, list: List) {
	try {
		const watched = await getUserWatchedAction()
		const watchlist = await getUserWatchListAction()
		const media = await getMediaAction(imdbId)

		if (!media) {
			throw new Error('Media not found')
		}

		type ListType = typeof watched
		let selectedList: ListType

		if (list === 'watched') {
			selectedList = watched
		} else {
			selectedList = watchlist
		}

		const index = selectedList.findIndex(item => item.mediaId === media.id)

		if (index === -1) {
			throw new Error('Media not found in list')
		}

		const elementId = selectedList[index].id

		if (list === 'watched') {
			await prisma.watchedList.delete({
				where: {
					id: elementId,
				},
			})
		} else {
			await prisma.watchlist.delete({
				where: {
					id: elementId,
				},
			})
		}

		revalidatePath('/media-list')

		return {
			success: true,
		}
	} catch (error) {
		const e = error as unknown as Error & { stack: string }
		console.log(e.stack)
		return {
			success: false,
		}
	}
}
