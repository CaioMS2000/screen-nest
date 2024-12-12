'use server'
import { COOKIE_USERNAME, COOKIE_USER_NAME } from '@/constants/http'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { LoginFormData } from '../@types/zod'
import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function loginAction(data: LoginFormData) {
	console.log(data)
	const user = await prisma.user.findUnique({
		where: {
			username: data.username,
		},
	})

	if (!user) {
		return { success: false, message: 'Credenciais inválidas' }
	}

	const isPasswordValid = await compare(data.password, user.passwordHash)

	if (!isPasswordValid) {
		return { success: false, message: 'Credenciais inválidas' }
	}

	const cookieStore = await cookies()

	cookieStore.set(COOKIE_USER_NAME, user.name)
	cookieStore.set(COOKIE_USERNAME, data.username)

	redirect('/')
}
