'use client'
import React from 'react'
import { TVShow } from '@/app/@types/tmbd'
import { useRouter } from 'next/navigation'
import ImageComponent from '@/components/image-component'
import dayjs from 'dayjs'
import { convertMinutesToHours } from '@/utils'
import { StarIcon } from '@/components/houstonicons/star'
import { CheckmarkSquare02Icon } from '@/components/houstonicons/check'
import { Clock01Icon } from '@/components/houstonicons/clock'
import { ArrowLeft03Icon } from '@/components/houstonicons/arrow-left'
import { User } from '@/app/@types/entities/user'
import { PlusSignSquareIcon } from '@/components/houstonicons/plus'
import { AlertCircleIcon } from '@/components/houstonicons/alert'
import { UserCircleIcon } from '@/components/houstonicons/user'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)

interface MediaDetailsPageProps {
	serie: TVShow
	user?: User
}

export function MediaDetailsPage({ serie, user }: MediaDetailsPageProps) {
	const router = useRouter()
	let isInWatchlist = false
	let isInWatchedlist = false

	if (user) {
		isInWatchlist = user.watchList.some(
			media => media.imdbId === serie.id.toString()
		)
		isInWatchedlist = user.watched.some(
			media => media.imdbId === serie.id.toString()
		)
	}

	return (
		<div className="min-h-screen bg-[#121212] pb-12">
			{/* Hero Section */}
			<div className="relative h-[70vh] w-full">
				<button
					onClick={() => router.push('/')}
					className="absolute top-4 left-4 z-10 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70"
				>
					<ArrowLeft03Icon className="size-10 text-white" />
				</button>
				<div className="absolute inset-0">
					<ImageComponent
						width={0}
						height={0}
						sizes="2000px"
						className="h-full w-full object-cover"
						src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
						alt={serie.name}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
				</div>
			</div>

			{/* Content Section */}
			<div className="-mt-32 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-8 md:flex-row">
					{/* Poster */}
					<div className="w-64 flex-shrink-0">
						<img
							src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`}
							alt={serie.name}
							className="w-full rounded-lg shadow-xl"
						/>
					</div>

					{/* Details */}
					<div className="flex-1">
						<h1 className="mb-2 font-bold text-4xl">{serie.name}</h1>
						<div className="mb-6 flex items-center gap-4 text-gray-400">
							<span>{dayjs(serie.first_air_date).get('y')}</span>
							<span>•</span>
							<span>{'Série'}</span>
							{serie.episode_run_time && serie.episode_run_time[0] && (
								<>
									<span>•</span>
									<span>{convertMinutesToHours(serie.episode_run_time[0])}</span>
								</>
							)}
							<div className="flex items-center gap-1 text-yellow-500">
								<StarIcon className="size-5 text-yellow-400" />
								<span>{serie.vote_average.toFixed(1)}</span>
							</div>
						</div>

						{!user && (
							<span className="mb-8 font-bold text-red-500">Você não está logado</span>
						)}
						{user && isInWatchlist && (
							<button
								className={
									'mb-8 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 transition-colors hover:bg-green-600'
								}
							>
								<CheckmarkSquare02Icon className="size-5 text-white" />
								<span>Na Lista</span>
							</button>
						)}
						{user && !isInWatchlist && (
							<button
								className={
									'mb-8 flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 transition-colors hover:bg-red-600'
								}
							>
								<Clock01Icon className="size-5 text-white" />
								<span>Adicionar à lista</span>
							</button>
						)}
						{user && !isInWatchedlist && (
							<button
								className={
									'mb-8 flex items-center gap-2 rounded-lg bg-pink-500 px-6 py-3 transition-colors hover:bg-pink-600'
								}
							>
								<PlusSignSquareIcon className="size-5 text-white" />
								<span>Marcar como assistido</span>
							</button>
						)}
						{user && isInWatchedlist && (
							<button
								className={
									'mb-8 flex items-center gap-2 rounded-lg bg-yellow-500 px-6 py-3 transition-colors hover:bg-yellow-600'
								}
								disabled
							>
								<AlertCircleIcon className="size-5 text-white" />
								<span>Você já assistiu</span>
							</button>
						)}

						<div className="space-y-6">
							<div>
								<h2 className="mb-2 font-semibold text-xl">Sinopse</h2>
								<p className="text-gray-400 leading-relaxed">{serie.overview}</p>
							</div>

							{serie.genres && (
								<div>
									<h2 className="mb-2 font-semibold text-xl">Gêneros</h2>
									<div className="flex flex-wrap gap-2">
										{serie.genres.map(genre => (
											<span
												key={genre.id}
												className="rounded-full bg-[#2a2a2a] px-3 py-1 text-sm"
											>
												{genre.name}
											</span>
										))}
									</div>
								</div>
							)}

							{serie.created_by && (
								<div>
									<h2 className="mb-2 font-semibold text-xl">Criação</h2>
									{serie.created_by.slice(0, 5).map(creator => (
										<div key={creator.id} className="flex items-center gap-2 mb-2">
											{creator.profile_path && (
												<img
													src={`https://image.tmdb.org/t/p/w500${creator.profile_path}`}
													alt={creator.name}
													className="h-10 w-10 rounded-full"
												/>
											)}
											{!creator.profile_path && (
												<UserCircleIcon className="h-10 w-10 rounded-full text-gray-400" />
											)}
											<div>
												<p className="font-semibold">{creator.name}</p>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
