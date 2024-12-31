'use server'

import { prisma } from '@/lib/prisma'
import { MediaType } from '@/app/@types'

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
