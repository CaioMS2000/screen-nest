import { prisma } from '@/lib/prisma'
import { User } from '../@types/entities/user'

export async function getUserAction(
	username?: string
): Promise<User | undefined> {
	if (!username) {
		return undefined
	}
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			username: username,
		},
		include: {
			watched: true,
			watchList: true,
		},
	})
	const watched = user.watched.map(media => ({
		id: media.type,
		imdbId: media.type,
		type: media.type,
	}))
	const watchList = user.watchList.map(media => ({
		id: media.type,
		imdbId: media.type,
		type: media.type,
	}))

	return {
		id: user.id,
		username: user.username,
		name: user.name,
		watched,
		watchList,
	}
}
