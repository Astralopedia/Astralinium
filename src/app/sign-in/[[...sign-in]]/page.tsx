import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
	return (
		<div className='min-h-screen grid place-items-center w-full'>
			<SignIn />
		</div>
	)
}
