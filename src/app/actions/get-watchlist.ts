'use server'
import { prisma } from '@/lib/prisma'
import { Media } from '../@types/entities/media'

export async function getWatchListAction(username: string) {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			username,
		},
		include: {
			watchList: true,
		},
	})

	const medias: Media[] = user.watchList

	return medias
}
