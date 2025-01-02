'use server'

import { getUserAction } from './get-user'

export async function getUserWatchedAction() {
	const user = await getUserAction()

	if (!user) {
		throw new Error('User not found')
	}

	return user.watched
}
