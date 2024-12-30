import { PopularMoviesSection } from '@/components/popular-movies'
import { Component } from './home-component'

export default async function Home() {
	return (
		<>
			<Component>
				<PopularMoviesSection />
			</Component>
		</>
	)
}
