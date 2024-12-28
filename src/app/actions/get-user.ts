import { COOKIE_USERNAME } from '@/constants/http'
import CookieManager from '@/utils/cookie-manager'

export async function getUserAction() {
	const user = await CookieManager.getCookie(COOKIE_USERNAME)
	return user?.value
}
