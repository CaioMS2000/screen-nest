'use server'
import { prisma } from '@/lib/prisma'
import { Media } from '../@types/entities/media'

export async function getWatchedListAction(username: string) {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			username,
		},
		include: {
			watched: true,
		},
	})

	console.log(user.watched)
	const medias: Media[] = user.watched

	return medias
}
