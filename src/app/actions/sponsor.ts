'use server'

import { SponsorFormData } from '../@types/zod'
import { adddMediaToWatchlistAction } from './add-to-watchlist'

export async function sponsorAction(data: SponsorFormData, username: string) {
	try {
		console.log(data)
		console.log(username)

		// const result = await adddMediaToWatchlistAction('MOVIE', data.imdbId, data.mediaId, username)

		// if(result.success === false){
		//     return {
		//         success: false,
		//         error: result.error
		//     }
		// }
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
