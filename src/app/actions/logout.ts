'use server'
import { COOKIE_USERNAME, COOKIE_USER_NAME } from '@/constants/http'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAction() {
	const cookieStore = await cookies()

	if (cookieStore.has(COOKIE_USER_NAME)) cookieStore.delete(COOKIE_USER_NAME)
	if (cookieStore.has(COOKIE_USERNAME)) cookieStore.delete(COOKIE_USERNAME)

	redirect('/')

	return {
		success: true,
		message: 'Logout realizado com sucesso',
	}
}
