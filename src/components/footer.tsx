import Link from 'next/link'

export async function Footer() {
	return (
		<footer className="mt-10 bg-black py-4 text-white">
			<div className="container mx-auto text-center">
				<p>
					&copy; {new Date().getFullYear()}{' '}
					<Link
						href={'https://www.linkedin.com/in/caio-m-silva/'}
						target="_blank"
						className="text-blue-600"
					>
						Caio M. Silva.
					</Link>{' '}
					Todos os direitos reservados.
				</p>
			</div>
		</footer>
	)
}
