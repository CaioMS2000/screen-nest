'use client'

import { useCookies } from '@/hooks/cookies'

export function Component() {
	const { cookies } = useCookies()
	console.log(cookies.find(cookie => cookie.name === 'test'))
	return (
		<>
			<div>Home</div>
		</>
	)
}
