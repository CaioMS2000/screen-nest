'use client'
import { MediaMetaList } from '@/app/@types'
import { User } from '@/app/@types/entities/user'
import { MovieCredits, TVShow } from '@/app/@types/tmbd'
import { SponsorFormData } from '@/app/@types/zod'
import { sponsorSchema } from '@/app/@types/zod/schemas'
import { adddMediaToWatchedtAction } from '@/app/actions/add-media-to-watched'
import { sponsorAction } from '@/app/actions/sponsor'
import { AlertCircleIcon } from '@/components/houstonicons/alert'
import { ArrowLeft03Icon } from '@/components/houstonicons/arrow-left'
import { CheckmarkSquare02Icon } from '@/components/houstonicons/check'
import { Clock01Icon } from '@/components/houstonicons/clock'
import { PlusSignSquareIcon } from '@/components/houstonicons/plus'
import { StarIcon } from '@/components/houstonicons/star'
import { UserCircleIcon } from '@/components/houstonicons/user'
import ImageComponent from '@/components/image-component'
import { minutesToHours } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/react'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { MediaType } from '@/app/@types'

dayjs.locale(ptBR)

interface MediaDetailsProps {
	user?: User
	credits?: MovieCredits
	watchlist?: MediaMetaList
	watchedList?: MediaMetaList
	imdb_id: string
	poster_path: string
	title: string
	release_date: string
	overview: string
	runtime?: number
	vote_average: number
	genres: {
		id: number
		name: string
	}[]
	createdBy?: TVShow['created_by']
	id: string
	mediaType: MediaType
}

export function MediaDetails({
	user,
	credits,
	imdb_id,
	poster_path,
	title,
	overview,
	release_date,
	runtime,
	vote_average,
	genres,
	createdBy,
	id,
	watchlist,
	watchedList,
	mediaType,
}: MediaDetailsProps) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SponsorFormData>({
		resolver: zodResolver(sponsorSchema),
		defaultValues: {
			date: dayjs().format('YYYY-MM-DD'),
			mediaId: id,
			imdbId: imdb_id,
			name: 'caio',
			price: '1',
			mediaType: mediaType,
		},
	})
	const router = useRouter()
	let isInWatchlist = false
	let isInWatchedlist = false

	if (user && watchlist && watchedList) {
		isInWatchlist = watchlist.some(media => media.mediaImdbId === imdb_id)
		isInWatchedlist = watchedList.some(media => media.mediaImdbId === imdb_id)
	}

	async function handleSponsor(data: SponsorFormData) {
		if (!user) {
			router.push('/login')
			return
		}

		const result = await sponsorAction(data)

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

		const result = await adddMediaToWatchedtAction(imdb_id, 'MOVIE')

		if (!result.success) {
			toast.error('Erro ao adicionar na lista de assistidos')
		} else {
			toast.success('Adicionado na lista de assistidos')
		}
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
						src={`https://image.tmdb.org/t/p/original${poster_path}`}
						alt={title}
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
							src={`https://image.tmdb.org/t/p/w300${poster_path}`}
							alt={title}
							className="w-full rounded-lg shadow-xl"
						/>
					</div>

					{/* Details */}
					<div className="flex-1">
						<h1 className="mb-2 font-bold text-4xl">{title}</h1>
						<div className="mb-6 flex items-center gap-4 text-gray-400">
							<span>{dayjs(release_date).get('y')}</span>
							<span>•</span>
							<span>{'Filme'}</span>
							{runtime && (
								<>
									<span>•</span>
									<span>{minutesToHours(runtime)}</span>
								</>
							)}
							<div className="flex items-center gap-1 text-yellow-500">
								<StarIcon className="size-5 text-yellow-400" />
								<span>{vote_average.toFixed(1)}</span>
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
														onSubmit={handleSubmit(handleSponsor)}
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
								<p className="text-gray-400 leading-relaxed">{overview}</p>
							</div>
							{genres && (
								<div>
									<h2 className="mb-2 font-semibold text-xl">Gêneros</h2>
									<div className="flex flex-wrap gap-2">
										{genres.map(genre => {
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
								{credits &&
									credits.cast.slice(0, 5).map(castMember => {
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
							{credits && (
								<div>
									<h2 className="mb-2 font-semibold text-xl">Direção</h2>
									{credits.crew
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
							{createdBy && createdBy.length > 0 && (
								<div>
									<h2 className="mb-2 font-semibold text-xl">Criação</h2>
									{createdBy.slice(0, 5).map(creator => (
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
