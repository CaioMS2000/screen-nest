'use client'
import ImageComponent from '@/components/image-component'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface HeaderProps {
	searchInputConfig: {
		inputValue: string
		inputChange: (value: string) => void
	}
}

export default function Header({
	searchInputConfig: { inputValue, inputChange },
}: HeaderProps) {
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
						<Search className="size-10" />
						<Input
							className="w-96"
							placeholder="Pesquisar..."
							value={inputValue}
							onChange={e => inputChange(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Button className="bg-zinc-700 font-semibold text-white">Login</Button>
					<Button className="bg-app-red font-semibold text-white">Registrar</Button>
				</div>
			</header>
		</>
	)
}
