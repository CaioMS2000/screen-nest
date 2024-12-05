'use client'
import tailwindConfig from '@/../tailwind.config'
import { BreakpointsKeys } from '@/app/@types/tailwind'
import { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

const EMPTY_BREAKPOINT = {
	'': 0,
}
const fullConfig = resolveConfig(tailwindConfig)
const breakpoints = Object.entries(
	fullConfig.theme.screens as Record<BreakpointsKeys, string>
).map(([key, value]) => {
	return {
		[`${key}`]: Number.parseInt(value.replace('px', '')),
	}
})
export function useCurrentBreakpoint() {
	if (typeof window === 'undefined') {
		console.warn(
			'window is not defined. You must use this function on client side'
		)

		return EMPTY_BREAKPOINT
	}
	const [currentBreakpoint, setCurrentBreakpoint] = useState(
		getBreakpoint(window.innerWidth)
	)

	function getBreakpoint(width: number) {
		const currentBreakpoint = breakpoints.find(breakpoint => {
			const [key, value] = Object.entries(breakpoint)[0]
			return width <= value
		})

		return currentBreakpoint ?? EMPTY_BREAKPOINT
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		window.addEventListener('resize', () => {
			const currentBreakpoint = getBreakpoint(window.innerWidth)
			setCurrentBreakpoint(currentBreakpoint)
		})
	}, [])

	return currentBreakpoint
}
