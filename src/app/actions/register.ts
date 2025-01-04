'use server'
import { RegisterFormData } from '../@types/zod'
import { register } from '@/services/register'

export async function registerAction(data: RegisterFormData) {
	try {
		await register(data.name, data.username, data.password)

		return {
			success: true,
			message: 'Usuário registrado com sucesso!',
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			}
		}

		return {
			success: false,
			message: 'Erro ao registrar usuário',
		}
	}
}
