'use server'

import { prisma } from '@/lib/prisma'
import { MediaType } from '@/app/@types'
import { revalidatePath } from 'next/cache'

export async function adddMediaToWatchedtAction(
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
				watched: {
					create: {
						imdbId,
						type: mediaType,
					},
				},
			},
			include: {
				watched: true,
			},
		})

		console.log(updatedUser)

		revalidatePath('/movie')

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
