import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.user.deleteMany().then(() => {
	console.log('Deleted users')
})

prisma.media.deleteMany().then(() => {
	console.log('Deleted media')
})
