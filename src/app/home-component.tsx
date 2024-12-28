'use client'

import { useCookies } from '@/hooks/cookies'

export function Component() {
	const { cookie } = useCookies()
	return (
		<>
			<div>Home</div>
			<div>{cookie}</div>
		</>
	)
}
