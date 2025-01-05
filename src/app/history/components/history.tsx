'use client'

import { Sponsorship } from '@/app/@types'
import { ArrowLeft03Icon } from '@/components/houstonicons/arrow-left'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HistoryProps {
	sponsorships: Sponsorship[]
}

export default function History({ sponsorships }: HistoryProps) {
	const router = useRouter()

	const totalAmount = sponsorships.reduce(
		(total, sponsorship) => total + sponsorship.amount,
		0
	)

	return (
		<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="mb-8 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div
						className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-800"
						onClick={() => router.back()}
					>
						<ArrowLeft03Icon className="h-6 w-6 text-white" />
					</div>
					<h1 className="font-bold text-2xl">Histórico de Doações</h1>
				</div>
				<div className="text-right">
					<p className="text-gray-400 text-sm">Total Recebido</p>
					<p className="font-bold text-2xl text-green-500">
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(totalAmount)}
					</p>
				</div>
			</div>

			<div className="space-y-4">
				{sponsorships.map((sponsor, index) => {
					const key = `${sponsor.id}-${index}`
					return (
						<div
							key={key}
							className="flex items-center gap-4 rounded-lg bg-[#2a2a2a] p-4"
						>
							<img
								src={`https://image.tmdb.org/t/p/w500${sponsor.media.posterUrl}`}
								alt={sponsor.media.title}
								className="h-24 w-16 rounded object-cover"
							/>
							<div className="flex-1">
								<h3 className="font-semibold">{sponsor.media.title}</h3>
								<p className="text-gray-400 text-sm">Doação de {sponsor.donatedBy}</p>
								<div className="mt-2 flex items-center gap-4 text-sm">
									<span className="font-medium text-green-500">
										{new Intl.NumberFormat('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										}).format(sponsor.amount)}
									</span>
									<span className="text-gray-500">
										{new Intl.DateTimeFormat('pt-BR').format(sponsor.date)}
									</span>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
