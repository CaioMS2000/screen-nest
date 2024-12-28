import getCookie from './actions/get-cookie'
import { Component } from './home-component'

export default async function Home() {
	const cookies = await getCookie()
	console.log(cookies)
	return (
		<>
			<Component />
		</>
	)
}
