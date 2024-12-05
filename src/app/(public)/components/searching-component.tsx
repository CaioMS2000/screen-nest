interface SearchingComponentProps {
	query: string
}

export default function SearchingComponent({ query }: SearchingComponentProps) {
	return (
		<>
			<p className="text-lg text-white">{query}</p>
		</>
	)
}
