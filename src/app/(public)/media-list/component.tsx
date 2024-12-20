'use client'
import { CheckmarkSquare02Icon } from '@/components/houstonicons/check'
import { Clock01Icon } from '@/components/houstonicons/clock'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

enum List {
	WATCHED = 'watched',
	WANT_TO_WATCH = 'want_to_watch',
}

export function MediaList() {
	const [list, setList] = useState(List.WANT_TO_WATCH)

	return (
		<>
			<div className="inline-flex w-full justify-center gap-10 pt-10">
				<Button
					className="inline-flex items-center gap-2 bg-app-red"
					size="lg"
					onPress={() => setList(List.WANT_TO_WATCH)}
				>
					<Clock01Icon className="size-5 text-white" />
					<span className="font-bold">Para assistir</span>
				</Button>
				<Button
					className="inline-flex items-center gap-2 bg-green-700"
					size="lg"
					onPress={() => setList(List.WATCHED)}
				>
					<CheckmarkSquare02Icon className="size-5 text-white" />
					<span className="font-bold">Já assistidos</span>
				</Button>
			</div>
			{list === List.WANT_TO_WATCH && <div>Lista de assistir</div>}
			{list === List.WATCHED && <div>Lista de já assistidos</div>}
		</>
	)
}
