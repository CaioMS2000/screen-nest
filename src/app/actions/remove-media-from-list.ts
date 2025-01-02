'use server'

import { COOKIE_USERNAME } from '@/constants/http'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

type List = 'watched' | 'watchList'

export async function removeMediaFromListAction(imdbId: string, list: List) {
	try {
		const cookieStore = await cookies()
		const username = cookieStore.get(COOKIE_USERNAME)

		if (!username || !username.value) {
			throw new Error('User not found')
		}

		const user = await prisma.user.findUniqueOrThrow({
			where: {
				username: username.value,
			},
			include: {
				watched: true,
				watchList: true,
			},
		})

		type ListType = typeof user.watched extends Array<infer U> ? U : never

		let mediaList: ListType[]

		if (list === 'watched') {
			mediaList = user.watched
		} else {
			mediaList = user.watchList
		}

		const mediaIndex = mediaList.findIndex(media => media.imdbId === imdbId)

		if (mediaIndex === -1) {
			throw new Error('Media not found')
		}

		if (list === 'watched') {
			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					watched: {
						delete: {
							id: mediaList[mediaIndex].id,
						},
					},
				},
			})
		} else {
			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					watchList: {
						delete: {
							id: mediaList[mediaIndex].id,
						},
					},
				},
			})
		}

		revalidatePath('/media-list')

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
