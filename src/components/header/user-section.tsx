'use client'
import { useUser } from '@/hooks/user'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function UserSection() {
	const { username, isLoggedIn } = useUser()
	const router = useRouter()

	return (
		<>
			<div className="flex items-center gap-4">
				{!isLoggedIn && (
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
				)}
				{isLoggedIn && <h3 className="h3">Usuário logado</h3>}
			</div>
		</>
	)
}
