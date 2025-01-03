'use server'

import { MediaType } from '@/app/@types'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { createMediaAction } from './create-media'
import { getMediaAction } from './get-media'
import { getUserAction } from './get-user'

export async function adddMediaToWatchlistAction(
	imdbId: string,
	mediaType: MediaType
) {
	try {
		const existingMedia = await getMediaAction(imdbId)
		let media: NonNullable<Awaited<ReturnType<typeof getMediaAction>>>

		if (existingMedia) {
			media = existingMedia
		} else {
			media = await createMediaAction(imdbId, mediaType)
		}

		const user = await getUserAction()

		if (!user) {
			throw new Error('User not found')
		}

		const newElement = await prisma.watchlist.create({
			data: {
				mediaImdbId: media.imdbId,
				userId: user.id,
			},
		})

		console.log(newElement)

		if (mediaType === 'MOVIE') {
			revalidatePath('/movie')
		} else if (mediaType === 'SERIES') {
			revalidatePath('/serie')
		}

		return {
			success: true,
			media,
		}
	} catch (error) {
		const e = error as unknown as Error & { stack: string }
		console.log(e.stack)
		return {
			success: false,
		}
	}
}
