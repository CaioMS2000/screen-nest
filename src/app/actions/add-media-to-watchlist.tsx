'use server'

import { MediaType } from '@/app/@types'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function adddMediaToWatchlistAction(
	imdbId: string,
	mediaType: MediaType,
	username: string
) {
	try {
		const updatedUser = await prisma.user.update({
			where: {
				username,
			},
			data: {
				watchList: {
					create: {
						imdbId,
						type: mediaType,
					},
				},
			},
			include: {
				watchList: true,
			},
		})

		console.log(updatedUser)

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
