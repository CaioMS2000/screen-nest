import ImageComponent from '@/components/image-component'
import { get } from '@/utils/tmdb'

export default async function Home() {
	let url = '/tv/popular?language=en-US&page=1'
	let response = await get(url)
	const popularTVShows = await response.json()

	url = '/movie/popular?language=en-US&page=1'
	response = await get(url)
	const popularMovies = await response.json()

	return (
		<>
			{popularTVShows?.results?.map((item: any) => (
				<div key={item.id}>
					<h1>{item.name}</h1>
					<ImageComponent
						width={0}
						height={0}
						sizes="600px"
						className="w-96"
						src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
						alt={item.name}
					/>
				</div>
			))}
			{popularMovies?.results?.map((item: any) => (
				<div key={item.id}>
					<h1>{item.title}</h1>
					<ImageComponent
						width={0}
						height={0}
						sizes="600px"
						className="w-96"
						src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
						alt={item.title}
					/>
				</div>
			))}
		</>
	)
}
