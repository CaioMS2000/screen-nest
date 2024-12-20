import { COOKIE_USERNAME } from '@/constants/http'
import { cookies } from 'next/headers'
import Header from '../components/header'
import { MediaList } from './component'

export default async function MediaListPage() {
	const cookieStore = await cookies()
	const username = cookieStore.get(COOKIE_USERNAME)

	return (
		<>
			<Header usernameFromCookies={username?.value} />
			<MediaList />
		</>
	)
}
