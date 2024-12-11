import { secondsToMiliseconds } from '@/utils'
import { useEffect, useState } from 'react'

interface UseDebounceConfig {
	delay?: number
}
export function useDebounce<T>(
	value: T,
	config: UseDebounceConfig = { delay: secondsToMiliseconds(0.8) }
) {
	const [debouncedValue, setDebouncedValue] = useState(value)
	const { delay } = config

	useEffect(() => {
		let id: NodeJS.Timeout | undefined

		if (typeof value === 'string' && value.length === 0) {
			setDebouncedValue(value)
		} else {
			id = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)
		}

		return () => {
			if (id) clearTimeout(id)
		}
	}, [value, delay])

	return debouncedValue
}
export default useDebounce
