interface PageParams {
	params: Promise<{ id: string }>
}

export default async function SeriePage({ params }: PageParams) {
	const _params = await params
	const { id } = _params
	return (
		<>
			<h2 className="h2">Página da série com id {id}</h2>
		</>
	)
}
