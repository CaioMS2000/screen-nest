'use server'
import { cookies } from 'next/headers'

const getCookie = async () => {
	const cookieStore = await cookies()
	const data = cookieStore.getAll()

	return data
}

export default getCookie
