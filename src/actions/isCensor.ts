import { createClient } from '@/utils/supabase/client'
import { jwtDecode } from 'jwt-decode'

export default async function isCensor(): Promise<boolean> {
	let userRole

	await new Promise<void>((resolve, reject) => {
		createClient().auth.onAuthStateChange(async (event, session) => {
			if (session) {
				const jwt = jwtDecode(session.access_token) as any
				userRole = jwt.user_role
				resolve()
			} else {
				reject(new Error('Session not found'))
			}
		})
	})

	return userRole === 'censor'
}
