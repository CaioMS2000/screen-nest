import { get } from '@/utils/tmdb'

interface PageParams {
	params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: PageParams) {
	const _params = await params
	const { id } = _params
	const response = await get(`/movie/${id}`)
	const data = await response.json()
	console.log(data)

	console.log()
	return (
		<>
			<h2 className="h2">Página do filme com id {id}</h2>
		</>
	)
}
