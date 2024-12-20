'use client'
import { User } from '@/app/@types/entities/user'
import { useCallback, useEffect, useState } from 'react'
import { COOKIE_USERNAME } from '@/constants/http'
import { getCookie } from 'cookies-next/client'
import { getUserAction } from '@/app/actions/get-user'

export function useUser() {
	const username = getCookie(COOKIE_USERNAME)
	const [user, setUser] = useState<User | undefined>(undefined)
	const isLoggedIn = user !== undefined

	const fetchUser = useCallback(async (username: string) => {
		const user = await getUserAction(username)

		if (user) {
			setUser(user)
		}
	}, [])

	useEffect(() => {
		if (username) {
			fetchUser(username)
		}
	}, [username, fetchUser])

	return { user, isLoggedIn }
}
