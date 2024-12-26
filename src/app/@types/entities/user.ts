import { Media } from './media'

export type User = {
	id: string
	username: string
	name: string
	watched: Media[]
	watchList: Media[]
}
