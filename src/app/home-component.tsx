'use client'
import { Search01Icon } from '@/components/houstonicons/search'
import useDebounce from '@/hooks/use-debounce'
import { Input } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Component({
	children,
}: Readonly<{
	children?: React.ReactNode
}>) {
	const router = useRouter()
	const pathname = usePathname()
	const params = new URLSearchParams(useSearchParams().toString())
	const urlQueryState = params.get('query')
	const [searchText, setSearchText] = useState(urlQueryState ?? '')
	const deboundedValue = useDebounce(searchText)
	const isDeboundedValueEmpty = deboundedValue.length === 0

	useEffect(() => {
		const newParams = new URLSearchParams()
		if (!isDeboundedValueEmpty) {
			if (!urlQueryState || urlQueryState !== deboundedValue) {
				newParams.set('query', deboundedValue)
				router.push(`${pathname}?${newParams.toString()}`)
			}
		} else {
			if (params.size > 0) {
				router.push(`${pathname}`)
			}
		}
	}, [
		isDeboundedValueEmpty,
		params,
		router,
		urlQueryState,
		deboundedValue,
		pathname,
	])

	return (
		<>
			<main>
				<Input
					className="mx-auto mt-7 w-[500px] placeholder:font-bold placeholder:text-white"
					placeholder="Pesquisar..."
					size="lg"
					startContent={<Search01Icon className="size-5 text-white" />}
					isClearable
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
				/>
				<div className="div"></div>
				{isDeboundedValueEmpty && children && <div className="div">{children}</div>}
			</main>
		</>
	)
}
