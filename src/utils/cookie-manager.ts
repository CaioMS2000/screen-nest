import { cookies } from 'next/headers'

export class CookieManager {
	static async getCookie(name: string) {
		const cookieStore = await cookies()

		const cookie = cookieStore.get(name)

		return cookie
	}

	static async setCookie(name: string, value: string, options = {}) {
		'use server'
		const cookieStore = await cookies()

		cookieStore.set(name, value, options)
	}
}

export default CookieManager
