'use server'

import { prisma } from '@/lib/prisma'
import { getUserAction } from './get-user'

export async function getUserWatchListAction() {
	const user = await getUserAction()

	if (!user) {
		throw new Error('User not found')
	}

	const watchlist = await prisma.watchlist.findMany({
		where: {
			userId: user.id,
		},
	})

	return watchlist
}
