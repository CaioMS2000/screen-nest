'use client'
import { Search01Icon } from '@/components/houstonicons/search'
import ImageComponent from '@/components/image-component'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useRouter } from 'next/navigation'
import ActionArea from './action-area'

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
			<header className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-white">
				<div className="flex items-center gap-4">
					<ImageComponent
						width={0}
						height={0}
						sizes="600px"
						className="w-28"
						src="/images/video.png"
						alt="logo"
					/>
					<div className="flex items-center gap-2">
						<Input
							className="w-96 placeholder:font-bold placeholder:text-white"
							placeholder="Pesquisar..."
							value={inputValue}
							startContent={<Search01Icon className="size-5 text-white" />}
							onChange={e => inputChange(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<ActionArea />
				</div>
			</header>
		</>
	)
}
