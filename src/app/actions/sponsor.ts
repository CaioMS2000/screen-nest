'use server'

import { prisma } from '@/lib/prisma'
import { SponsorFormData } from '../@types/zod'
import { adddMediaToWatchlistAction } from './add-to-watchlist'

export async function sponsorAction(data: SponsorFormData, username: string) {
	try {
		console.log(data)
		console.log(username)
		console.log({
			mediaId: data.mediaId,
			imdbId: data.imdbId,
			price: Number(data.price),
			date: new Date(data.date),
		})

		const user = await prisma.user.findUniqueOrThrow({
			where: {
				username,
			},
		})
		const sponsor = await prisma.sponsorship.create({
			data: {
				user: {
					connect: {
						id: user.id,
					},
				},
				mediaId: data.mediaId,
				imdbId: data.imdbId,
				price: Number(data.price),
				date: new Date(data.date),
			},
		})
		console.log('\n')
		console.log(sponsor)

		const result = await adddMediaToWatchlistAction(
			'MOVIE',
			data.imdbId,
			data.mediaId,
			username
		)

		if (result.success === false) {
			return {
				success: false,
				error: result.error,
			}
		}

		return {
			success: true,
		}
	} catch (error) {
		return {
			success: false,
			error: error,
		}
	}
}
