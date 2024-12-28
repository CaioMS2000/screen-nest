'use client'
import { User } from '@/app/@types/entities/user'
import { Movie, MovieCredits } from '@/app/@types/tmbd'
import { adddMediaToWatchedAction } from '@/app/actions/add-to-watched'
import { AlertCircleIcon } from '@/components/houstonicons/alert'
import { ArrowLeft03Icon } from '@/components/houstonicons/arrow-left'
import { CheckmarkSquare02Icon } from '@/components/houstonicons/check'
import { Clock01Icon } from '@/components/houstonicons/clock'
import { PlusSignSquareIcon } from '@/components/houstonicons/plus'
import { StarIcon } from '@/components/houstonicons/star'
import { UserCircleIcon } from '@/components/houstonicons/user'
import ImageComponent from '@/components/image-component'
import { convertMinutesToHours } from '@/utils'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { sponsorSchema } from '@/app/@types/zod/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SponsorFormData } from '@/app/@types/zod'
import { sponsorAction } from '@/app/actions/sponsor'

dayjs.locale(ptBR)

interface MediaDetailsPageProps {
	movie: Movie
	user?: User
}

export function MediaDetailsPage({ movie, user }: MediaDetailsPageProps) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const movieWithCredits = movie as unknown as Movie & {
		credits: MovieCredits
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SponsorFormData>({
		resolver: zodResolver(sponsorSchema),
		defaultValues: {
			date: dayjs().format('YYYY-MM-DD'),
			mediaId: movie.id,
			imdbId: movie.imdb_id,
			name: '',
			price: '',
			mediaType: 'MOVIE',
		},
	})
	const router = useRouter()
	let isInWatchlist = false
	let isInWatchedlist = false

	if (user) {
		isInWatchlist = user.watchList.some(media => media.imdbId === movie.imdb_id)
		isInWatchedlist = user.watched.some(media => media.imdbId === movie.imdb_id)
	}

	async function handleAdddMediaToWatchlist(data: SponsorFormData) {
		if (!user) {
			router.push('/login')
			return
		}

		const result = await sponsorAction(data, user.username)

		if (!result.success) {
			toast.error('Erro ao adicionar na lista de assistir')
		} else {
			onClose()
			toast.success('Adicionado na lista de assistir')
		}
	}

	async function handleAdddMediaToWatchedAction() {
		if (!user) {
			router.push('/login')
			return
		}

		const result = await adddMediaToWatchedAction(
			'MOVIE',
			movie.imdb_id,
			movie.id,
			user.username
		)

		if (!result.success) {
			toast.error('Erro ao adicionar na lista de assistidos')
		} else {
			toast.success('Adicionado na lista de assistidos')
		}
	}

	useEffect(() => {
		console.log(errors)
	}, [errors])

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
							<>
								{/* <button
							 	className={
							 		'mb-8 flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 transition-colors hover:bg-red-600'
							 	}
							 	onClick={handleAdddMediaToWatchlist}
							 >
							 	<Clock01Icon className="size-5 text-white" />
							 	<span>Adicionar à lista</span>
							 </button> */}
								<button
									className={
										'mb-8 flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 transition-colors hover:bg-red-600'
									}
									onClick={onOpen}
								>
									<Clock01Icon className="size-5 text-white" />
									<span>Adicionar à lista</span>
								</button>
								<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
									<ModalContent>
										{onClose => (
											<>
												<ModalHeader className="flex flex-col gap-1">
													Reservar o filme
												</ModalHeader>
												<ModalBody>
													<form
														onSubmit={handleSubmit(handleAdddMediaToWatchlist)}
														id="watchlist-form"
														className="flex flex-col gap-4"
													>
														<label htmlFor="name" className="">
															Quem patrocinou?
														</label>
														<input
															type="text"
															id="name"
															{...register('name')}
															className="rounded border p-2 placeholder:text-zinc-500/50"
															placeholder="ex: AdemiroUchihaDeathnoteSuperSayajin123😎😎"
														/>
														<label htmlFor="price" className="">
															Preço
														</label>
														<input
															type="number"
															id="price"
															{...register('price')}
															className="rounded border p-2"
															placeholder="0,00"
														/>
													</form>
												</ModalBody>
												<ModalFooter>
													<Button color="danger" variant="light" onPress={onClose}>
														Cancelar
													</Button>
													<Button color="primary" type="submit" form="watchlist-form">
														Reservar
													</Button>
												</ModalFooter>
											</>
										)}
									</ModalContent>
								</Modal>
							</>
						)}
						{user && !isInWatchedlist && (
							<button
								className={
									'mb-8 flex items-center gap-2 rounded-lg bg-pink-500 px-6 py-3 transition-colors hover:bg-pink-600'
								}
								onClick={handleAdddMediaToWatchedAction}
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
								<span>Você ja assistiu</span>
							</button>
						)}
						<div className="space-y-6">
							<div>
								<h2 className="mb-2 font-semibold text-xl">Sinopse</h2>
								<p className="text-gray-400 leading-relaxed">{movie.overview}</p>
							</div>
							{movie.genres && (
								<div>
									<h2 className="mb-2 font-semibold text-xl">Gêneros</h2>
									<div className="flex flex-wrap gap-2">
										{movie.genres.map(genre => {
											return (
												<span
													key={genre.id}
													className="rounded-full bg-[#2a2a2a] px-3 py-1 text-sm"
												>
													{genre.name}
												</span>
											)
										})}
									</div>
								</div>
							)}
							<div>
								<h2 className="mb-2 font-semibold text-xl">Elenco Principal</h2>
								{movieWithCredits.credits &&
									movieWithCredits.credits.cast.slice(0, 5).map(castMember => {
										return (
											<div key={castMember.id} className="flex items-center gap-2 mb-2">
												{castMember.profile_path ? (
													<img
														src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
														alt={castMember.name}
														className="w-10 h-10 rounded-full"
													/>
												) : (
													<UserCircleIcon className="w-10 h-10 rounded-full text-gray-400" />
												)}
												<div>
													<p className="font-semibold">{castMember.name}</p>
													<p className="text-gray-400">{castMember.character}</p>
												</div>
											</div>
										)
									})}
							</div>
							{movieWithCredits.credits && (
								<div>
									<h2 className="mb-2 font-semibold text-xl">Direção</h2>
									{movieWithCredits.credits.crew
										.filter(member => member.known_for_department.includes('Directing'))
										.filter(
											(member, index, self) =>
												self.findIndex(m => m.id === member.id) === index
										)
										.slice(0, 5)
										.map(director => {
											return (
												<div key={director.id} className="flex items-center gap-2 mb-2">
													{director.profile_path && (
														<img
															src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
															alt={director.name}
															className="h-10 w-10 rounded-full"
														/>
													)}
													{!director.profile_path && (
														<UserCircleIcon className="h-10 w-10 rounded-full text-gray-400" />
													)}
													<div>
														<p className="font-semibold">{director.name}</p>
														<p className="text-gray-400">{director.known_for_department}</p>
													</div>
												</div>
											)
										})}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
