'use server'

import { RegisterFormData } from '../@types/zod'

export async function registerAction(data: RegisterFormData) {
	console.log(data)
}
