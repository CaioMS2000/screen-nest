'use client'

import { logoutAction } from '@/app/actions/logout'
import { TransitionLeftIcon } from '@/components/houstonicons/transition-left'
import { UserSquareIcon } from '@/components/houstonicons/user'
import { useUser } from '@/hooks/user'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function LoggedUser() {
	const { username } = useUser()
	const router = useRouter()

	async function handleLogout() {
		if (username) {
			await logoutAction(username)
		}
	}

	return (
		<div className="flex gap-4 items-center">
			<span className="flex items-center gap-2">
				<UserSquareIcon className="size-10" />
				{username}
			</span>
			<Button
				variant="bordered"
				color="danger"
				className="mx-4 font-semibold"
				onPress={() => router.push('/media-list')}
			>
				Lista
			</Button>
			<Button isIconOnly onPress={handleLogout}>
				<TransitionLeftIcon className="size-5 text-app-red" color="" />
			</Button>
		</div>
	)
}
