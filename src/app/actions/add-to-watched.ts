'use server'

import { prisma } from '@/lib/prisma'
import { MediaType } from '@/app/@types'
import { revalidatePath } from 'next/cache'

export async function adddMediaToWatchedAction(
	mediaType: MediaType,
	imdbId: string,
	id: string | number,
	username: string
) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		})

		if (!user) {
			throw new Error('User not found')
		}

		await prisma.user.update({
			where: {
				username,
			},
			data: {
				watched: {
					create: {
						type: mediaType,
						imdbId: imdbId,
					},
				},
			},
		})

		if (mediaType === 'MOVIE') {
			revalidatePath(`/movie/${id}`)
		} else {
			revalidatePath(`/serie/${id}`)
		}

		return {
			success: true,
		}
	} catch (error) {
		return {
			success: false,
			error: error,
		}
	}
}
