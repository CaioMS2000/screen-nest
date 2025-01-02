'use client'

import { Sponsorship } from '@/app/@types'
import { ArrowLeft03Icon } from '@/components/houstonicons/arrow-left'
import Link from 'next/link'

interface HistoryProps {
	sponsorships: Sponsorship[]
}

export default function History({ sponsorships }: HistoryProps) {
	const totalAmount = sponsorships.reduce(
		(total, sponsorship) => total + sponsorship.amount,
		0
	)

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-4">
					<Link
						href={'/'}
						className="p-2 hover:bg-gray-800 rounded-full transition-colors"
					>
						<ArrowLeft03Icon className="w-6 h-6" />
					</Link>
					<h1 className="text-2xl font-bold">Histórico de Doações</h1>
				</div>
				<div className="text-right">
					<p className="text-sm text-gray-400">Total Recebido</p>
					<p className="text-2xl font-bold text-green-500">
						{new Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(totalAmount)}
					</p>
				</div>
			</div>

			<div className="space-y-4">
				{sponsorships.map(sponsor => (
					<div
						key={sponsor.id}
						className="bg-[#2a2a2a] rounded-lg p-4 flex items-center gap-4"
					>
						<img
							// src={sponsor.media.posterUrl}
							src={`https://image.tmdb.org/t/p/w500${sponsor.media.posterUrl}`}
							alt={sponsor.media.title}
							className="w-16 h-24 object-cover rounded"
						/>
						<div className="flex-1">
							<h3 className="font-semibold">{sponsor.media.title}</h3>
							<p className="text-sm text-gray-400">Doação de {sponsor.donatedBy}</p>
							<div className="mt-2 flex items-center gap-4 text-sm">
								<span className="text-green-500 font-medium">
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
				))}
			</div>
		</div>
	)
}
