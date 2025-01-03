'use server'

import { prisma } from '@/lib/prisma'

export async function getMediaAction(imdbId: string) {
	const media = await prisma.media.findUnique({
		where: {
			imdbId: imdbId,
		},
	})

	return media
}
