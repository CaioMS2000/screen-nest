'use client'
import React from 'react'
import { Movie, MovieCredits } from '@/app/@types/tmbd'
import { useRouter } from 'next/navigation'
import ImageComponent from '@/components/image-component'
import dayjs from 'dayjs'
import { convertMinutesToHours } from '@/utils'
import { StarIcon } from '@/components/houstonicons/star'
import { CheckmarkSquare02Icon } from '@/components/houstonicons/check'
import { Clock01Icon } from '@/components/houstonicons/clock'
import { ArrowLeft03Icon } from '@/components/houstonicons/arrow-left'

interface MediaDetailsPageProps {
	movie: Movie
}

export function MediaDetailsPage({ movie }: MediaDetailsPageProps) {
	const movieWithCredits = movie as unknown as Movie & {
		credits: MovieCredits
	}
	const router = useRouter()
	const isInWatchlist = true
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
						src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
						alt={movie.title}
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
							src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
							alt={movie.title}
							className="w-full rounded-lg shadow-xl"
						/>
					</div>

					{/* Details */}
					<div className="flex-1">
						<h1 className="mb-2 font-bold text-4xl">{movie.title}</h1>

						<div className="mb-6 flex items-center gap-4 text-gray-400">
							<span>{dayjs(movie.release_date).get('y')}</span>
							<span>•</span>
							<span>{'Filme'}</span>
							{movie.runtime && (
								<>
									<span>•</span>
									<span>{convertMinutesToHours(movie.runtime)}</span>
								</>
							)}
							<div className="flex items-center gap-1 text-yellow-500">
								<StarIcon className="size-5 text-yellow-400" />
								<span>{movie.vote_average.toFixed(1)}</span>
							</div>
						</div>

						<button
							onClick={() => {}}
							className={`mb-8 flex items-center gap-2 rounded-lg px-6 py-3 transition-colors ${
								isInWatchlist
									? 'bg-green-500 hover:bg-green-600'
									: 'bg-red-500 hover:bg-red-600'
							}`}
						>
							{isInWatchlist ? (
								<>
									<CheckmarkSquare02Icon className="size-5 text-white" />
									<span>Na Lista</span>
								</>
							) : (
								<>
									<Clock01Icon className="size-5 text-white" />
									<span>Adicionar à Lista</span>
								</>
							)}
						</button>

						<div className="space-y-6">
							<div>
								<h2 className="mb-2 font-semibold text-xl">Sinopse</h2>
								<p className="text-gray-400 leading-relaxed">{movie.overview}</p>
							</div>

							{movie.genres && (
								<div>
									<h2 className="mb-2 font-semibold text-xl">Gêneros</h2>
									<div className="flex flex-wrap gap-2">
										{movie.genres.map(genre => (
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

							<div>
								<h2 className="text-xl font-semibold mb-2">Elenco Principal</h2>
								{movieWithCredits.credits &&
									movieWithCredits.credits.cast.slice(0, 5).map(castMember => (
										<div key={castMember.id} className="flex items-center gap-2 mb-2">
											<img
												src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
												alt={castMember.name}
												className="w-10 h-10 rounded-full"
											/>
											<div>
												<p className="font-semibold">{castMember.name}</p>
												<p className="text-gray-400">{castMember.character}</p>
											</div>
										</div>
									))}
							</div>

							{movieWithCredits.credits && (
								<div>
									<h2 className="text-xl font-semibold mb-2">Direção</h2>
									{movieWithCredits.credits.crew
										.filter(member => member.known_for_department.includes('Directing'))
										.slice(0, 5)
										.map(director => (
											<div key={director.id} className="flex items-center gap-2 mb-2">
												<img
													src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
													alt={director.name}
													className="w-10 h-10 rounded-full"
												/>
												<div>
													<p className="font-semibold">{director.name}</p>
													<p className="text-gray-400">{director.known_for_department}</p>
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
