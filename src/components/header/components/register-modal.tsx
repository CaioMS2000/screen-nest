'use client'
import { RegisterFormData } from '@/app/@types/zod'
import { registerFormSchema } from '@/app/@types/zod/schemas'
import { registerAction } from '@/app/actions/register'
import { EyeIcon, EyeIconSlash } from '@/components/houstonicons/eye'
import { ArrangeByLettersAZIcon } from '@/components/houstonicons/letters'
import { SquareLock01Icon } from '@/components/houstonicons/lock'
import { UserCircleIcon } from '@/components/houstonicons/user'
import { USERNAME_TO_LOGIN_URL_STATE } from '@/constants/http'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function RegisterModal() {
	const [isVisible, setIsVisible] = useState(false)
	const toggleVisibility = () => setIsVisible(!isVisible)
	const params = useSearchParams()
	const router = useRouter()
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: '',
			username: params.get('username') ?? '',
			password: '',
		},
	})
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

	async function onSubmit(data: RegisterFormData) {
		const result = await registerAction(data)

		if (!result.success) {
			return toast.error(result.message)
		}

		toast.success('Usuário registrado com sucesso!')
		router.push(`/?${USERNAME_TO_LOGIN_URL_STATE}=${data.username}`)
		// router.refresh()
		await new Promise(resolve => setTimeout(resolve, 1000 * 1))
		window.location.reload()
		onClose()
	}

	useEffect(() => {
		Object.keys(errors).forEach(key => {
			const message = errors[key as keyof FieldErrors<RegisterFormData>]?.message
			if (message) {
				toast.error(message)
			}
		})
	}, [errors])

	return (
		<>
			<Button className="bg-app-red font-semibold text-white" onPress={onOpen}>
				Registrar
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<form onSubmit={handleSubmit(onSubmit)}>
								<ModalHeader className="flex flex-col gap-1">Registre-se</ModalHeader>
								<ModalBody>
									<Input
										{...register('name')}
										size="lg"
										placeholder="seu nome"
										startContent={
											<ArrangeByLettersAZIcon className="pointer-events-none size-8 flex-shrink-0 text-default-400" />
										}
										type="text"
										isClearable
									/>
									<Input
										{...register('username')}
										size="lg"
										placeholder="usuário"
										startContent={
											<UserCircleIcon className="pointer-events-none size-8 flex-shrink-0 text-default-400" />
										}
										type="text"
										isClearable
									/>
									<Input
										{...register('password')}
										size="lg"
										placeholder="senha"
										startContent={
											<SquareLock01Icon className="pointer-events-none size-8 flex-shrink-0 text-default-400" />
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
										type={isVisible ? 'text' : 'password'}
										variant="bordered"
										// isClearable
									/>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="light" onPress={onClose}>
										Cancelar
									</Button>
									<Button color="primary" type="submit">
										Registrar
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
