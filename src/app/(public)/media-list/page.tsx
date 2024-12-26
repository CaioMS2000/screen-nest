import { COOKIE_USERNAME } from '@/constants/http'
import Header from '../components/header'
import { MediaList } from './components'
import CookieManager from '@/utils/cookie-manager'

export default async function MediaListPage() {
	const username = await CookieManager.getCookie(COOKIE_USERNAME)

	return (
		<>
			<Header usernameFromCookies={username?.value} />
			<MediaList username={username?.value} />
		</>
	)
}
