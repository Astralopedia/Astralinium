import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { NextResponse, type NextRequest } from 'next/server'

export const createClient = (request: NextRequest) => {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return getCookie(name, { req: request, res: response })
				},
				set(name: string, value: string, options: CookieOptions) {
					setCookie(name, value, {
						req: request,
						res: response,
						...options,
					})
				},
				remove(name: string, options: CookieOptions) {
					deleteCookie(name, {
						req: request,
						res: response,
						...options,
					})
				},
			},
		},
	)

	return { supabase, response }
}
