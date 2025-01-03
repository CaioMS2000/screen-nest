'use server'

import { prisma } from '@/lib/prisma'
import { getUserAction } from './get-user'

export async function getUserWatchedAction() {
	const user = await getUserAction()

	if (!user) {
		throw new Error('User not found')
	}

	const watched = await prisma.watchedList.findMany({
		where: {
			userId: user.id,
		},
	})

	return watched
}
