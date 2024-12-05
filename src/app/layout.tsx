import type { Metadata } from 'next'
import './globals.css'

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
			<body className={'antialiased'}>{children}</body>
		</html>
	)
}
