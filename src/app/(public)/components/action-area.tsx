'use client'

import { logoutAction } from '@/app/actions/logout'
import { TransitionLeftIcon } from '@/components/houstonicons/transition-left'
import { UserSquareIcon } from '@/components/houstonicons/user'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface ActionAreaProps {
	usernameFromCookies: string | undefined
}

export default function ActionArea({ usernameFromCookies }: ActionAreaProps) {
	const router = useRouter()
	const username = usernameFromCookies

	async function handleLogout() {
		const result = await logoutAction()

		if (!result.success && result.message) {
			toast.error(result.message)
			router.push('/')
		}
	}

	if (username) {
		return (
			<>
				<span className="flex items-center gap-2">
					<UserSquareIcon className="size-10" />
					{username}
				</span>
				<Button
					className="mx-4 bg-app-red font-semibold text-white"
					onPress={() => router.push('/media-list')}
				>
					Lista
				</Button>
				<Button isIconOnly onPress={handleLogout}>
					<TransitionLeftIcon className="size-5 text-app-red" color="" />
				</Button>
			</>
		)
	}

	return (
		<>
			<Button
				className="bg-zinc-700 font-semibold text-white"
				onPress={() => router.push('/login')}
			>
				Login
			</Button>
			<Button
				className="bg-app-red font-semibold text-white"
				onPress={() => router.push('/register')}
			>
				Registrar
			</Button>
		</>
	)
}
