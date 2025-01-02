'use server'
import { redirect } from 'next/navigation'
import { getUserAction } from '../actions/get-user'
import { prisma } from '@/lib/prisma'

export async function getUserSponsorshipsAction() {
	const user = await getUserAction()

	if (!user) {
		redirect('/')
	}

	const sponsorships = await prisma.sponsorship.findMany({
		where: {
			userId: user.id,
		},
	})

	return sponsorships
}
