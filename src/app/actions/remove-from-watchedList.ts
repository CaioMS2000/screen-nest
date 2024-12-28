'use server'

import { COOKIE_USERNAME } from '@/constants/http'
import { prisma } from '@/lib/prisma'
import { queryClient } from '@/lib/react-query'
import CookieManager from '@/utils/cookie-manager'
import { revalidatePath } from 'next/cache'

export async function removeFromWatchedListAction(imdbId: string) {
	try {
		const username = await CookieManager.getCookie(COOKIE_USERNAME)
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				username: username?.value,
			},
		})

		const media = await prisma.media.findFirstOrThrow({
			where: {
				imdbId: imdbId,
				watchedUserId: user.id,
			},
		})

		await prisma.media.delete({
			where: {
				id: media.id,
			},
		})

		revalidatePath('/media-list')
		if (media.type === 'MOVIE') {
			queryClient.invalidateQueries({
				queryKey: ['MOVIE', imdbId],
			})
		} else {
			queryClient.invalidateQueries({
				queryKey: ['SERIES', imdbId],
			})
		}

		queryClient.invalidateQueries({
			queryKey: ['watchedlist', username?.value],
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
