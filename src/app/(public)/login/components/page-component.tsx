'use client'
import { LoginFormData } from '@/app/@types/zod'
import { loginFormSchema } from '@/app/@types/zod/schemas'
import { loginAction } from '@/app/actions/login'
import { EyeIcon, EyeIconSlash } from '@/components/houstonicons/eye'
import { SquareLock01Icon } from '@/components/houstonicons/lock'
import { UserCircleIcon } from '@/components/houstonicons/user'
import ImageComponent from '@/components/image-component'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function PageComponent() {
	const [isVisible, setIsVisible] = useState(false)
	const params = useSearchParams()
	const router = useRouter()
	const toggleVisibility = () => setIsVisible(!isVisible)
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: params.get('username') ?? 'username',
			password: '123456789',
		},
	})

	const handleLogin = async (data: LoginFormData) => {
		const result = await loginAction(data)

		if (!result) {
			toast.error('Erro ao realizar o login')
			return
		}
		if (!result.success && result.message) {
			toast.error(result.message)
			return
		}
		if (result.success) {
			toast.success('Login realizado com sucesso')
			reset()
			router.push('/')
		}
	}

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
				<h1 className="font-bold text-2xl">Screen Nest - Faça login</h1>
				<form
					onSubmit={handleSubmit(handleLogin)}
					className="mt-10 flex flex-col gap-5"
				>
					<Input
						{...register('username')}
						startContent={
							<UserCircleIcon className="pointer-events-none size-10 flex-shrink-0 text-2xl text-default-400" />
						}
						placeholder="um-nome-de-usuario"
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
