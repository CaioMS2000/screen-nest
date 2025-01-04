import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
	title: 'Screen Nest',
	description:
		'Aplicação para pesquisar conteúdos audiovisuais e organizá-los em sua coleção pessoal.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className="scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-hide-arrows"
		>
			<body className={'dark min-h-screen bg-app-black-500 antialiased'}>
				<Providers>
					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
