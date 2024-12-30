'use server'

import { COOKIE_USER_NAME, COOKIE_USERNAME } from '@/constants/http'
import { cookies } from 'next/headers'

export async function logoutAction(username: string) {
	const cookieStore = await cookies()
	const cookie = cookieStore.get(COOKIE_USERNAME)

	if (cookie && cookie.value === username) {
		cookieStore.delete(COOKIE_USERNAME)
		cookieStore.delete(COOKIE_USER_NAME)
	}
}
