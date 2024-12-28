'use client'
import { CookieType } from '@/app/@types/http'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'

interface CookieContextType {
	cookies: CookieType
}

export const CookieContext = createContext<CookieContextType | null>(null)

export const useCookies = (): CookieContextType => {
	const context = useContext(CookieContext)
	if (!context) {
		throw new Error('useCookies must be used within a CookieProvider')
	}
	return context
}

export const CookieProvider = ({
	children,
	cookies,
}: PropsWithChildren<{
	cookies: CookieType
}>) => {
	const providerValue = useMemo(
		() => ({
			cookies: cookies,
		}),
		[cookies]
	)

	return (
		<CookieContext.Provider value={providerValue as CookieContextType}>
			{children}
		</CookieContext.Provider>
	)
}
