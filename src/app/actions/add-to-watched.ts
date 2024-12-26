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
			include: {
				watchList: true,
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

		revalidatePath(`/movie/${id}`)

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
