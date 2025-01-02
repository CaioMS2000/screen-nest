'use server'

import { prisma } from '@/lib/prisma'

export async function getMediaAction(mediaId: string) {
	const media = await prisma.media.findUnique({
		where: {
			id: mediaId,
		},
	})

	if (!media) {
		throw new Error('Media not found')
	}

	return media
}
