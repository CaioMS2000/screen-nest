'use server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { RegisterFormData } from '../@types/zod'

export async function registerAction(data: RegisterFormData) {
	const user = await prisma.user.findUnique({
		where: {
			username: data.username,
		},
	})

	if (user) {
		return { success: false, message: 'Usuário já existe' }
	}
	const hashedPassword = await hash(data.password, 3)

	await prisma.user.create({
		data: {
			username: data.username,
			passwordHash: hashedPassword,
			name: data.name,
		},
	})

	const urlParams = new URLSearchParams()

	urlParams.set('username', data.username)

	const redirectUrl = `/login?${urlParams.toString()}`

	redirect(redirectUrl)

	return { success: true }
}
