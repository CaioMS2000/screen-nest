'use client'

import { logoutAction } from '@/app/actions/logout'
import { TransitionLeftIcon } from '@/components/houstonicons/transition-left'
import { UserSquareIcon } from '@/components/houstonicons/user'
import { COOKIE_USERNAME } from '@/constants/http'
import { Button } from '@nextui-org/react'
import { getCookie } from 'cookies-next/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function ActionArea() {
	const router = useRouter()
	const username = getCookie(COOKIE_USERNAME)

	console.log(username)

	async function handleLogout() {
		const result = await logoutAction()
		console.log(result)
		if (!result.success && result.message) {
			toast.error(result.message)
		}
	}

	if (username) {
		return (
			<>
				<span className="flex items-center gap-2">
					<UserSquareIcon className="size-10" />
					{username}
				</span>
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
