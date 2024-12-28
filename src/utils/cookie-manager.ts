import { cookies } from 'next/headers'

export class CookieManager {
	static cookieStore: ReturnType<typeof cookies> | undefined

	constructor() {
		CookieManager.cookieStore = cookies()
	}

	static async getCookie(name: string) {
		CookieManager.cookieStore = cookies()

		const cookieStore = await CookieManager.cookieStore
		return cookieStore.get(name)
	}

	static async setCookie(name: string, value: string, options = {}) {
		CookieManager.cookieStore = cookies()

		const cookieStore = await CookieManager.cookieStore

		cookieStore.set(name, value, options)
	}
}

export default CookieManager
