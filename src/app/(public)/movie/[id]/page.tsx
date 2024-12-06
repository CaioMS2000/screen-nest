interface PageParams {
	params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: PageParams) {
	const _params = await params
	const { id } = _params
	return (
		<>
			<h2 className="h2">Página do filme com id {id}</h2>
		</>
	)
}
