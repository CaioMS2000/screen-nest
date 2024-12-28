'use client'
import { queryClient } from '@/lib/react-query'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

export default function ClientSideProviders({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Toaster richColors />
				<NextUIProvider>{children}</NextUIProvider>
			</QueryClientProvider>
		</>
	)
}
