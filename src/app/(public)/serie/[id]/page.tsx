import { get } from '@/utils/tmdb'

interface PageParams {
	params: Promise<{ id: string }>
}

export default async function SeriePage({ params }: PageParams) {
	const _params = await params
	const { id } = _params
	const response = await get(`/tv/${id}`)
	const data = await response.json()
	console.log(data)
	return (
		<>
			<h2 className="h2">Página da série com id {id}</h2>
		</>
	)
}
