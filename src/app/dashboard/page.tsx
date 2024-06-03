'use server'

import { getImages } from '@/actions/api/Bunny'
import getUsernameById from '@/actions/clerk/getUsernameById'
import Appearance from '@/components/appearance'
import Menu from '@/components/menu'
import MyGallery from '@/components/my-gallery'
import PrivateGallery, { EdgeStoreImage } from '@/components/private-gallery'
import UploadFile from '@/components/upload-file'
import { backendEdgeStoreClient } from '@/lib/edgestore-server'
import { OrganizationSwitcher, Protect } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { DateTime } from 'luxon'
import { SearchParams } from 'nuqs/parsers'
import path from 'path'
import { Suspense } from 'react'
import { URL } from 'url'
import Loading from './loading'
import { searchParamsCache } from './searchParams'

interface PageProps {
	searchParams: SearchParams
}

export default async function Dashboard({ searchParams }: PageProps) {
	searchParamsCache.parse(searchParams)
	const { t } = searchParamsCache.all()
	const user = await currentUser()
	const data = await getImages()
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
		<div className='w-full h-full text-base-content'>
			<div className='grid p-8 md:p-16 gap-6 w-full grid-cols-3'>
				<div className='col-span-3 md:col-span-1 flex flex-col gap-8 w-full'>
					<OrganizationSwitcher
						appearance={{
							elements: {
								organizationSwitcherTrigger: 'bg-base-200',
							},
						}}
					/>
					<div className='card w-full bg-base-200'>
						<div className='card-body'>
							<h2 className='card-title'>Hi, {user?.username}</h2>
							<p className='text-lg'>
								You have uploaded{' '}
								<span className='bg-orange-400 text-white p-1 rounded-lg'>
									23
								</span>{' '}
								files on Astralinium
							</p>
						</div>
					</div>
					<Menu />
				</div>
				<div className='col-span-3 md:col-span-2 w-full h-full bg-base-200 rounded-2xl'>
					{t === 'my-gallery' ? (
						<Suspense fallback={<Loading />}>
							<MyGallery images={data} />
						</Suspense>
					) : t === 'upload-files' ? (
						<div>
							<UploadFile userId={user?.id!} />
						</div>
					) : t === 'appearance' ? (
						<Appearance />
					) : t === 'review-images' ? (
						<Protect
							role='org:admin'
							fallback={<p>Nothing here for you</p>}>
							<Suspense fallback={<Loading />}>
								<PrivateGallery images={edgeStoreData} />
							</Suspense>
						</Protect>
					) : null}
				</div>
			</div>
		</div>
	)
}
