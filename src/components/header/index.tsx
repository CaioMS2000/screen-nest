import Link from 'next/link'
import { UserSection } from './components/user-section'
import { Film01Icon } from '../houstonicons/film'
import { cn } from '@/lib/utils'

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {}

export async function Header({ className, ...props }: HeaderProps) {
	return (
		<>
			<header
				className={cn(
					'flex items-center justify-between bg-app-black-100 px-4 py-4 text-white md:py-2',
					className
				)}
				{...props}
			>
				<div className="flex items-center gap-5">
					<Link href={'/'} className="flex cursor-pointer items-center gap-2">
						<Film01Icon className="size-10 text-app-red" />
						<h3 className="font-bold text-lg">Screen Nest</h3>
					</Link>
				</div>
				<UserSection />
			</header>
		</>
	)
}
