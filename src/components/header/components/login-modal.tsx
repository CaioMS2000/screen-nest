'use client'
import { LoginFormData } from '@/app/@types/zod'
import { loginFormSchema } from '@/app/@types/zod/schemas'
import { EyeIcon, EyeIconSlash } from '@/components/houstonicons/eye'
import { SquareLock01Icon } from '@/components/houstonicons/lock'
import { UserCircleIcon } from '@/components/houstonicons/user'
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
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginModal() {
	const [isVisible, setIsVisible] = useState(false)
	const toggleVisibility = () => setIsVisible(!isVisible)
	const params = useSearchParams()
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: params.get('username') ?? 'caio',
			password: '123456789',
		},
	})
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

	function onSubmit(data: LoginFormData) {
		console.log('faça login com:', data)
		// onClose()
	}

	return (
		<>
			<Button className="bg-zinc-700 font-semibold text-white" onPress={onOpen}>
				Login
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<form onSubmit={handleSubmit(onSubmit)}>
								<ModalHeader className="flex flex-col gap-1">Faça login</ModalHeader>
								<ModalBody>
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
										placeholder="usuário"
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
										Entrar
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
