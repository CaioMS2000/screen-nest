'use server'
import { login } from '@/services/login'
import { LoginFormData } from '../@types/zod'
import CookieManager from '@/utils/cookie-manager'
import { COOKIE_USER_NAME, COOKIE_USERNAME } from '@/constants/http'
import { cookies } from 'next/headers'

export async function loginAction(data: LoginFormData) {
	const { isLogged, user } = await login(data.username, data.password)

	if (isLogged) {
		const cookieStore = await cookies()

		cookieStore.set(COOKIE_USERNAME, user.username)
		cookieStore.set(COOKIE_USER_NAME, user.name)
		// CookieManager.setCookie(COOKIE_USERNAME, user.username)
		// CookieManager.setCookie(COOKIE_USER_NAME, user.name)
	}

	return isLogged
}
