'use server'

import { prisma } from '@/lib/prisma'

export async function getMediaByIdAction(id: string) {
	const media = await prisma.media.findUniqueOrThrow({
		where: {
			id: id,
		},
	})

	return media
}
