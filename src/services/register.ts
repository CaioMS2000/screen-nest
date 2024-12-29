import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function register(
	name: string,
	username: string,
	password: string
) {
	console.log('register', name, username, password)
	const hashedPassword = await hash(password, 3)
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	})

	if (user) {
		console.warn('Usuário já existe')
		throw new Error('Usuário já existe')
	}

	const newUser = await prisma.user.create({
		data: {
			name,
			username,
			passwordHash: hashedPassword,
		},
	})

	console.log(newUser)
}
