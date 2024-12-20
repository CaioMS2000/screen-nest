import { prisma } from '@/lib/prisma'
import { User } from '../@types/entities/user'

export async function getUserAction(username: string): Promise<User | null> {
	return prisma.user.findUnique({
		where: {
			username: username,
		},
	})
}
