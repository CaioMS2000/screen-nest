export function secondsToMiliseconds(seconds: number) {
	return seconds * 1000
}

export function convertMinutesToHours(minutes: number) {
	const hours = Math.floor(minutes / 60)
	const remainingMinutes = minutes % 60
	return `${hours}:${remainingMinutes.toString().padStart(2, '0')}`
}
