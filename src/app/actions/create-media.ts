'use server'
import { MediaType } from '@/app/@types'
import { prisma } from '@/lib/prisma'

export async function createMediaAction(imdbId: string, type: MediaType) {
	const media = await prisma.media.create({
		data: {
			imdbId: imdbId,
			type: type,
		},
	})

	return media
}
