import { currentUser } from '@clerk/nextjs/server'
import dynamic from 'next/dynamic'

const UploadFile = dynamic(() => import('@/components/UploadFile'), {
	ssr: false,
})

export default async function Page() {
	const user = await currentUser()

	return (
		<div className='h-screen w-full grid place-items-center'>
			<UploadFile userId={user?.id!} />
		</div>
	)
}
