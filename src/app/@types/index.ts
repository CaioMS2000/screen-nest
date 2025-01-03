export { MediaType } from '@prisma/client'
// export enum MediaType {
//   SERIES= 'SERIES',
//   MOVIE= 'MOVIE'
// };

export type Sponsorship = {
	id: string
	media: {
		title: string
		posterUrl: string
	}
	donatedBy: string
	amount: number
	date: Date
	status: string
}

export type MediaMetaList = {
	id: string
	userId: string
	mediaId: string
}[]
