'use server'

import { prisma } from '@/lib/prisma'
import { MediaType } from '@/app/@types'
import { revalidatePath } from 'next/cache'

export async function adddMediaToWatchlistAction(
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

		const userUpdated = await prisma.user.update({
			where: {
				username,
			},
			data: {
				watchList: {
					create: {
						type: mediaType,
						imdbId: imdbId,
					},
				},
			},
		})

		console.log(userUpdated)

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
