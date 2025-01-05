import { cn } from '@/lib/utils'
import Link from 'next/link'

interface FooterProps extends React.HTMLProps<HTMLDivElement> {}

export async function Footer({ className, ...props }: FooterProps) {
	return (
		<footer
			className={cn('mt-10 bg-app-black-100 py-4 text-white', className)}
			{...props}
		>
			<div className="container mx-auto text-center">
				<p>
					&copy; {new Date().getFullYear()}{' '}
					<Link
						href={'https://www.linkedin.com/in/caio-m-silva/'}
						target="_blank"
						className="ttext-blue-600 text-danger"
					>
						Caio M. Silva.
					</Link>{' '}
					Todos os direitos reservados.
				</p>
			</div>
		</footer>
	)
}
