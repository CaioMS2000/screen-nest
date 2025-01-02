import { MediaType } from '@/app/@types'
import { Movie, TVShow } from '@/app/@types/tmbd'

export function secondsToMiliseconds(seconds: number) {
	return seconds * 1000
}

export function minutesToHours(minutes: number) {
	const hours = Math.floor(minutes / 60)
	const remainingMinutes = minutes % 60
	return `${hours}:${remainingMinutes.toString().padStart(2, '0')}`
}

export function isMovie(
	data: TVShow | Movie,
	mediaType: MediaType
): data is Movie {
	return mediaType === 'MOVIE'
}

export function isSerie(
	data: TVShow | Movie,
	mediaType: MediaType
): data is TVShow {
	return mediaType === 'SERIES'
}
