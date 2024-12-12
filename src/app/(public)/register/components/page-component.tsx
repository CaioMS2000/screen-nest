'use client'
import { registerFormSchema } from '@/app/@types/zod/schemas'
import { registerAction } from '@/app/actions/register'
import { EyeIcon, EyeIconSlash } from '@/components/houstonicons/eye'
import { ArrangeByLettersAZIcon } from '@/components/houstonicons/letters'
import { SquareLock01Icon } from '@/components/houstonicons/lock'
import { UserCircleIcon } from '@/components/houstonicons/user'
import ImageComponent from '@/components/image-component'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function PageComponent() {
	const [isVisible, setIsVisible] = useState(true)
	const toggleVisibility = () => setIsVisible(!isVisible)
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: 'Caio',
			username: 'username',
			password: '123456789',
		},
	})

	useEffect(() => {
		if (errors) {
			console.log(errors)
		}
	}, [errors])

	return (
		<>
			<div className="flex h-screen flex-col items-center justify-center">
				<ImageComponent
					width={0}
					height={0}
					sizes="600px"
					className="w-48"
					src="/images/video.png"
					alt="logo"
				/>
				<h1 className="font-bold text-2xl">Screen Nest - Crie seu cadastro</h1>
				<form
					onSubmit={handleSubmit(registerAction)}
					className="mt-10 flex flex-col gap-5"
				>
					<Input
						{...register('name')}
						startContent={
							<ArrangeByLettersAZIcon className="pointer-events-none size-10 flex-shrink-0 text-2xl text-default-400" />
						}
						placeholder="Seu nome"
						type="text"
						size="lg"
					/>
					<Input
						{...register('username')}
						startContent={
							<UserCircleIcon className="pointer-events-none size-10 flex-shrink-0 text-2xl text-default-400" />
						}
						placeholder="nome-de-usuario"
						type="text"
						size="lg"
					/>
					<Input
						{...register('password')}
						className="max-w-xs"
						startContent={
							<SquareLock01Icon className="pointer-events-none size-10 flex-shrink-0 text-2xl text-default-400" />
						}
						endContent={
							<button
								aria-label="toggle password visibility"
								className="focus:outline-none"
								type="button"
								onClick={toggleVisibility}
							>
								{isVisible ? (
									<EyeIconSlash className="pointer-events-none text-2xl text-default-400" />
								) : (
									<EyeIcon className="pointer-events-none text-2xl text-default-400" />
								)}
							</button>
						}
						color="default"
						placeholder="Insira sua senha"
						type={isVisible ? 'text' : 'password'}
						variant="bordered"
						size="lg"
					/>
					<Button className="w-full bg-app-red" color="default" type="submit">
						<span className="font-bold text-lg">Entrar</span>
					</Button>
				</form>
			</div>
		</>
	)
}
