'use client'

import { queryClient } from '@/lib/react-query'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<NextUIProvider>{children}</NextUIProvider>
			</QueryClientProvider>
		</>
	)
}
