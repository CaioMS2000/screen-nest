'use client'
import { Search01Icon } from '@/components/houstonicons/search'
import ImageComponent from '@/components/image-component'
import { Input } from '@nextui-org/input'
import { useRouter } from 'next/navigation'
import ActionArea from './action-area'
import { Film01Icon } from '@/components/houstonicons/film'

interface HeaderProps {
	searchInputConfig: {
		inputValue: string
		inputChange: (value: string) => void
	}
}

export default function Header({
	searchInputConfig: { inputValue, inputChange },
}: HeaderProps) {
	const router = useRouter()

	return (
		<>
			<header className="flex items-center justify-between bg-app-black-100 px-4 py-2 text-white">
				<div className="flex items-center gap-5">
					<div
						className="flex cursor-pointer items-center gap-2"
						onClick={() => router.push('/')}
					>
						<Film01Icon className="text-app-red size-10" />
						<h3 className="font-bold text-lg">Screen Nest</h3>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<ActionArea />
				</div>
			</header>

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
