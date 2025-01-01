'use client'
import { useUser } from '@/hooks/user'
import LoginModal from './login-modal'
import RegisterModal from './register-modal'
import { LoggedUser } from './logged-user'
import { Skeleton } from '@nextui-org/skeleton'

export function UserSection() {
	const { isLoading, isLoggedIn } = useUser()

	if (isLoading) {
		return (
			<div className="flex items-center gap-4">
				<Skeleton className="h-5 w-12 rounded-lg bg-zinc-700" />
				<Skeleton className="h-5 w-8 rounded-lg bg-zinc-700" />
			</div>
		)
	}

	return (
		<>
			<div className="flex items-center gap-4">
				{!isLoggedIn && (
					<>
						<LoginModal />
						<RegisterModal />
					</>
				)}
				{isLoggedIn && <LoggedUser />}
			</div>
		</>
	)
}
