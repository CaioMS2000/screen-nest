'use server'

import { LoginFormData } from '../@types/zod'

export async function loginAction(data: LoginFormData) {
	console.log(data)
}
