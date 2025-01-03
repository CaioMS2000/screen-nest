'use server'
import { prisma } from '@/lib/prisma'
import { SponsorFormData } from '../@types/zod'
import { adddMediaToWatchlistAction } from './add-media-to-watchlist'
import { getUserAction } from './get-user'

export async function sponsorAction(data: SponsorFormData) {
	try {
		const user = await getUserAction()

		if (!user) {
			throw new Error('User not found')
		}

		const { mediaId, imdbId, name, price, date, mediaType } = data
		const result = await adddMediaToWatchlistAction(imdbId, mediaType)

		if (!result.success || !result.media) {
			throw new Error('Error adding media to watchlist')
		}

		const newSponsor = await prisma.sponsorship.create({
			data: {
				mediaImdbId: result.media.imdbId,
				userId: user.id,
				who: name,
				price: Number.parseFloat(price),
				date: new Date(date),
			},
		})

		console.log(newSponsor)

		return {
			success: true,
		}
	} catch (error) {
		const e = error as unknown as Error & { stack: string }
		console.log(e.stack)

		return {
			success: false,
		}
	}
}
