'use server'
import { prisma } from '@/lib/prisma'
import { User } from '../@types/entities/user'
import { cookies } from 'next/headers'
import { COOKIE_USERNAME } from '@/constants/http'

export async function getUserAction(): Promise<User | undefined> {
	try {
		const cookieStore = await cookies()
		const username = cookieStore.get(COOKIE_USERNAME)

		if (!username || !username.value) {
			return undefined
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
		const watched = user.watched.map(media => ({
			id: media.id,
			imdbId: media.imdbId,
			type: media.type,
		}))
		const watchList = user.watchList.map(media => ({
			id: media.id,
			imdbId: media.imdbId,
			type: media.type,
		}))

		return {
			id: user.id,
			username: user.username,
			name: user.name,
			watched,
			watchList,
		}
	} catch (error) {
		// @ts-ignore
		console.log(error.stack)
	}
}
