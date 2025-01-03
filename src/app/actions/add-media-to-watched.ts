'use server'

import { prisma } from '@/lib/prisma'
import { MediaType } from '@/app/@types'
import { revalidatePath } from 'next/cache'
import { getMediaAction } from './get-media'
import { createMediaAction } from './create-media'
import { getUserAction } from './get-user'

export async function adddMediaToWatchedtAction(
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

		const newElement = await prisma.watchedList.create({
			data: {
				mediaId: media.id,
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
		}
	} catch (error) {
		const e = error as unknown as Error & { stack: string }
		console.log(e.stack)
		return {
			success: false,
		}
	}
}
