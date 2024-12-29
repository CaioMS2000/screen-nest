'use server'
import { RegisterFormData } from '../@types/zod'
import { register } from '@/services/register'

export async function registerAction(data: RegisterFormData) {
	console.log('registrar com:', data)
	await register(data.name, data.username, data.password)
}
