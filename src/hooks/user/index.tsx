'use client'

import { useEffect, useState } from 'react'
import { useCookies } from '../cookies'
import { COOKIE_USERNAME, COOKIE_USER_NAME } from '@/constants/http'

export function useUser() {
	const { cookies } = useCookies()
	const [isLoading, setIsLoading] = useState(true)
	const [username, setUsername] = useState<string | undefined>(undefined)
	const [name, setName] = useState<string | undefined>(undefined)
	const isLoggedIn = username !== undefined && username !== ''

	useEffect(() => {
		let cookie = cookies.find(cookie => cookie.name === COOKIE_USERNAME)

		if (cookie) {
			setUsername(cookie.value)
		}

		cookie = cookies.find(cookie => cookie.name === COOKIE_USER_NAME)

		if (cookie) {
			setName(cookie.value)
		}

		setIsLoading(false)
	}, [cookies])

	return {
		username,
		name,
		isLoggedIn,
		isLoading,
	}
}
