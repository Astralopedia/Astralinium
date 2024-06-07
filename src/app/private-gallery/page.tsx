import getUsernameById from '@/actions/clerk/getUsernameById'
import { EdgeStoreImage } from '@/components/PrivateGallery'
import { backendEdgeStoreClient } from '@/lib/edgestore-server'
import { Protect } from '@clerk/nextjs'
import { DateTime } from 'luxon'
import dynamic from 'next/dynamic'
import path from 'path'
import Loading from './loading'

const PrivateGallery = dynamic(() => import('@/components/PrivateGallery'), {
	loading: () => <Loading />,
})

export default async function Page() {
	const edgeStoreData: EdgeStoreImage[] = await Promise.all(
		(
			await backendEdgeStoreClient.publicFiles.listFiles({
				pagination: { currentPage: 1, pageSize: 100 },
			})
		).data.map(async item => ({
			filename: path.basename(new URL(item.url).pathname),
			url: item.url,
			size: item.size,
			uploadedAt: DateTime.fromJSDate(item.uploadedAt).toISO()!,
			author: await getUsernameById(
				path
					.basename(new URL(item.url).pathname)
					.match(/user_[a-zA-Z0-9]+/)![0],
			),
		})),
	)

	return (
		<div className='h-screen w-full grid place-items-center'>
			<Protect role='org:admin' fallback={<p>Nothing here for you</p>}>
				{' '}
				<PrivateGallery images={[]} />
			</Protect>
		</div>
	)
}
