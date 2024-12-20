import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_USERNAME } from './constants/http'

export async function middleware(request: NextRequest) {
	const cookieStore = await cookies()
	const username = cookieStore.get(COOKIE_USERNAME)

	if (!username?.value && request.nextUrl.pathname.startsWith('/media-list')) {
		return NextResponse.redirect(new URL('/', request.url))
	}
}

export const config = {
	matcher: '/media-list/:path*',
}
