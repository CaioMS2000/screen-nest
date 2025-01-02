'use client'

import { logoutAction } from '@/app/actions/logout'
import { TransitionLeftIcon } from '@/components/houstonicons/transition-left'
import { UserSquareIcon } from '@/components/houstonicons/user'
import { useUser } from '@/hooks/user'
import { useRouter } from 'next/navigation'
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from '@nextui-org/react'
import { Key } from 'react'

export function LoggedUser() {
	const { username } = useUser()
	const router = useRouter()

	async function handleLogout() {
		if (username) {
			await logoutAction(username)
		}
	}

	// function handleDropdownSelection(key: string) {
	function handleDropdownSelection(key: Key) {
		if (key === 'history') {
			router.push('/history')
		}
	}

	return (
		<div className="flex items-center gap-4">
			<Dropdown>
				<DropdownTrigger>
					<button className="">
						<span className="text- flex items-center gap-2 rounded-lg bg-zinc-700 px-3 py-2 font-semibold">
							<UserSquareIcon className="size-10" />
							{username}
						</span>
					</button>
				</DropdownTrigger>
				<DropdownMenu
					aria-label="Action event example"
					onAction={handleDropdownSelection}
				>
					<DropdownItem key="history">Histórico</DropdownItem>
				</DropdownMenu>
			</Dropdown>
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
