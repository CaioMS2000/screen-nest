'use server'
import { prisma } from '@/lib/prisma'
import { SponsorFormData } from '../@types/zod'
import { adddMediaToWatchlistAction } from './add-media-to-watchlist'

export async function sponsorAction(data: SponsorFormData, username: string) {
	try {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				username,
			},
		})
		const { mediaId, imdbId, name, price, date, mediaType } = data
		const result = await adddMediaToWatchlistAction(imdbId, mediaType, username)

		if (!result.success || !result.media) {
			throw new Error('Error adding media to watchlist')
		}

		const newSponsor = await prisma.sponsorship.create({
			data: {
				mediaId: result.media.id,
				imdbId,
				who: name,
				price: Number.parseFloat(price),
				date: new Date(date),
				userId: user.id,
			},
		})
		console.log(newSponsor)

		return {
			success: true,
		}
	} catch (error) {
		const e = error as unknown as Error & { stack: string }
		// console.log(error)
		// console.log('\n')
		console.log(e.stack)

		return {
			success: false,
		}
	}
}
