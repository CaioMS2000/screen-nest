import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'

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
			<body className={'dark h-screen bg-app-black antialiased'}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
