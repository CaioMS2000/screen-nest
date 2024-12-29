import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'

export async function login(username: string, password: string) {
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	})

	if (!user) {
		throw new Error('Usuário não encontrado')
	}

	const isPasswordValid = await compare(password, user.passwordHash)

	return { isLogged: isPasswordValid, user }
}
