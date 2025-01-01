'use client'

import { useEffect, useState } from 'react'
import { useCookies } from '../cookies'
import { COOKIE_USERNAME } from '@/constants/http'

export function useUser() {
	const { cookies } = useCookies()
	const [isLoading, setIsLoading] = useState(true)
	const [username, setUsername] = useState<string | undefined>(undefined)
	const isLoggedIn = username !== undefined && username !== ''

	useEffect(() => {
		const cookie = cookies.find(cookie => cookie.name === COOKIE_USERNAME)

		if (cookie) {
			setUsername(cookie.value)
		}

		console.log('setting false')
		setIsLoading(false)
	}, [cookies])

	return {
		username,
		isLoggedIn,
		isLoading,
	}
}
