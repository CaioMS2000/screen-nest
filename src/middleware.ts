import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_USERNAME } from './constants/http'
import CookieManager from './utils/cookie-manager'

export async function middleware(request: NextRequest) {
	const username = await CookieManager.getCookie(COOKIE_USERNAME)

	if (!username?.value && request.nextUrl.pathname.startsWith('/media-list')) {
		return NextResponse.redirect(new URL('/', request.url))
	}
}

export const config = {
	matcher: '/media-list/:path*',
}
