import Link from 'next/link'
import { Film01Icon } from '../houstonicons/film'
import { UserSection } from './user-section'

export async function Header() {
	return (
		<>
			<header className="flex items-center justify-between bg-app-black-100 px-4 py-2 text-white">
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
