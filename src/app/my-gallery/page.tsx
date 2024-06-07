import { ImageType, getImages } from '@/actions/api/Bunny'
import { currentUser } from '@clerk/nextjs/server'
import dynamic from 'next/dynamic'
import Loading from './loading'

const MyGallery = dynamic(() => import('@/components/MyGallery'), {
	loading: () => <Loading />,
})

export default async function Page() {
	const data = await getImages()
	const user = await currentUser()

	const userImages: ImageType[] = data.filter(
		image => image.author === user?.username,
	)

	return (
		<div className='h-screen w-full grid place-items-center'>
			<MyGallery images={userImages} />
		</div>
	)
}
