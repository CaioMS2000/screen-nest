'use server'

import { get } from '@/utils/tmdb'
import { Movie } from '../@types/tmbd'
import { getUserAction } from './get-user'
import { COOKIE_USERNAME } from '@/constants/http'
import CookieManager from '@/utils/cookie-manager'
import { prisma } from '@/lib/prisma'

export async function fetchMovieAction(id: string) {
	const response = await get(`/movie/${id}?language=pt-BR`)
	const data: Movie = await response.json()
	const username = await CookieManager.getCookie(COOKIE_USERNAME)
	const user = await getUserAction(username?.value)

	if (!user) {
		throw new Error('User not found')
	}

	const sponsor = await prisma.sponsorship.findFirst({
		where: {
			userId: user.id,
			mediaId: data.id,
			imdbId: data.imdb_id,
		},
	})

	console.log(sponsor)

	return { movie: data, sponsor }
}
