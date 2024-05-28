import { createClient } from '@/utils/supabase/client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function LoginForm() {
	const signIn = async () => {
		'use server'
		const supabase = createClient()
		const origin = headers().get('origin')

		const { error, data } = await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: `${origin}/auth/callback`,
			},
		})

		if (error) {
			console.error(error)
		} else {
			return redirect(data.url)
		}
	}

	return (
		<div className='w-full h-screen grid place-items-center'>
			<div className='bg-base-200 w-3/4 sm:w-2/4 md:w-1/4 p-10 rounded-2xl'>
				<h1 className='text-base-content text-3xl text-center my-3'>
					Login
				</h1>
				<form
					action={signIn}
					className='w-full h-full grid place-items-center py-8'>
					<button className='btn bg-[#5865F2] hover:bg-[#5865F2] w-full hover:brightness-125 text-white'>
						<span className='i-fa6-brands-discord w-6 h-6'></span>
						Discord
					</button>
				</form>
			</div>
		</div>
	)
}
