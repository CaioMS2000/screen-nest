'use server'

import { COOKIE_USERNAME } from '@/constants/http'
import { prisma } from '@/lib/prisma'
import { queryClient } from '@/lib/react-query'
import CookieManager from '@/utils/cookie-manager'
import { revalidatePath } from 'next/cache'

export async function removeFromWatchlistAction(imdbId: string) {
	try {
		const username = await CookieManager.getCookie(COOKIE_USERNAME)
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				username: username?.value,
			},
			include: {
				watchList: true,
			},
		})

		const media = await prisma.media.findFirstOrThrow({
			where: {
				imdbId: imdbId,
				interestedUserId: user.id,
			},
		})

		await prisma.media.delete({
			where: {
				id: media.id,
			},
		})

		revalidatePath('/media-list')
		console.log('invalidating', ['MOVIE', imdbId])
		queryClient.invalidateQueries({
			queryKey: ['MOVIE', imdbId],
		})

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
