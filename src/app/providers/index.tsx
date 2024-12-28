import ClientSideProviders from './client-side'
import { CookieProvider } from '@/hooks/cookies'
import getCookie from '../actions/get-cookie'

export default async function Providers({
	children,
}: { children: React.ReactNode }) {
	const cookie = await getCookie()
	return (
		<>
			<CookieProvider cookie={cookie}>
				<ClientSideProviders>{children}</ClientSideProviders>
			</CookieProvider>
		</>
	)
}
