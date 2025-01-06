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
	Tooltip,
} from '@nextui-org/react'
import { Key } from 'react'
import { ArrowDown01Icon } from '@/components/houstonicons/arrow-down'
import { Menu01Icon } from '@/components/houstonicons/menu'

export function LoggedUser() {
	const { username, name } = useUser()
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
		<>
			<div className="hidden items-center gap-4 sm:flex">
				<Dropdown>
					<DropdownTrigger>
						<button className="">
							<span className="flex items-center gap-2 rounded-lg border-1 border-danger bg-app-black-500 px-3 py-2 font-semibold">
								<UserSquareIcon className="size-10 text-danger" />
								{name}
								<ArrowDown01Icon className="size-5 text-danger" />
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
					className="mx-4 bg-app-black-500 font-semibold"
					onPress={() => router.push('/media-list')}
				>
					Lista
				</Button>
				<Tooltip content="Sair" className="p-3 text-danger text-lg">
					<Button isIconOnly onPress={handleLogout} className="bg-app-black-500">
						<TransitionLeftIcon className="size-5 text-app-red" color="" />
					</Button>
				</Tooltip>
			</div>

			<div className="sm:hidden">
				<Dropdown>
					<DropdownTrigger>
						<button className="">
							<span className="flex items-center gap-2 rounded-lg border-1 border-danger bg-app-black-500 px-3 py-2 font-semibold text-sm">
								<UserSquareIcon className="size-6 text-danger" />
								{name}
								<Menu01Icon className="ml-2 size-5 text-danger" />
							</span>
						</button>
					</DropdownTrigger>
					<DropdownMenu
						aria-label="Action event example"
						onAction={handleDropdownSelection}
					>
						<DropdownItem key="history">Histórico</DropdownItem>
						<DropdownItem key="media-list">Minha lista</DropdownItem>
						<DropdownItem key="#" onPress={handleLogout}>
							Sair
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</>
	)
}
