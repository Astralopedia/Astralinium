import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
	return (
		<div className='min-h-screen grid place-items-center w-full'>
			<SignUp />
		</div>
	)
}
