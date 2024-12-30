import { PopularMoviesSection } from '@/components/popular-movies'
import { Component } from './home-component'
import { PopularSeriesSection } from '@/components/popular-series'

export default async function Home() {
	return (
		<>
			<Component>
				<PopularMoviesSection />
				<div id="spacer" className="h-5 bg-transparent"></div>
				<PopularSeriesSection />
			</Component>
		</>
	)
}
