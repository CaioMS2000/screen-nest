'use server'

import { COOKIE_USERNAME } from '@/constants/http'
import { cookies } from 'next/headers'

const getCookie = async () => {
	const cookieStore = await cookies()

	return cookieStore.get(COOKIE_USERNAME)?.value
}

export default getCookie
