'use client'
import { useUser } from '@/hooks/user'
import LoginModal from './login-modal'
import RegisterModal from './register-modal'
import { LoggedUser } from './logged-user'

export function UserSection() {
	const { username, isLoggedIn } = useUser()

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
