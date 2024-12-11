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
		<html lang="en">
			<body className={'dark h-screen bg-app-black antialiased'}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
