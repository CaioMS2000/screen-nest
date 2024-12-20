'use client'
import { Film01Icon } from '@/components/houstonicons/film'
import { Search01Icon } from '@/components/houstonicons/search'
import { Input } from '@nextui-org/input'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import ActionArea from './action-area'

interface StaticHeaderProps {
	router: AppRouterInstance
	usernameFromCookies: string | undefined
}

function StaticHeader({ router, usernameFromCookies }: StaticHeaderProps) {
	return (
		<>
			<header className="flex items-center justify-between bg-app-black-100 px-4 py-2 text-white">
				<div className="flex items-center gap-5">
					<div
						className="flex cursor-pointer items-center gap-2"
						onClick={() => router.push('/')}
					>
						<Film01Icon className="size-10 text-app-red" />
						<h3 className="font-bold text-lg">Screen Nest</h3>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<ActionArea usernameFromCookies={usernameFromCookies} />
				</div>
			</header>
		</>
	)
}

interface HeaderProps {
	usernameFromCookies: string | undefined
	searchInputConfig?: {
		inputValue: string
		inputChange: (value: string) => void
	}
}

export default function Header({
	searchInputConfig = undefined,
	usernameFromCookies,
}: HeaderProps) {
	const router = useRouter()

	if (!searchInputConfig) {
		return (
			<StaticHeader router={router} usernameFromCookies={usernameFromCookies} />
		)
	}

	const { inputValue, inputChange } = searchInputConfig

	return (
		<>
			<StaticHeader router={router} usernameFromCookies={usernameFromCookies} />
			<Input
				className="mx-auto mt-7 w-[500px] placeholder:font-bold placeholder:text-white"
				placeholder="Pesquisar..."
				value={inputValue}
				size="lg"
				startContent={<Search01Icon className="size-5 text-white" />}
				isClearable
				onChange={e => inputChange(e.target.value)}
			/>
		</>
	)
}
