'use client'

import { uploadImage } from '@/actions/api/Bunny'
import { useEdgeStore } from '@/lib/edgestore'
import cn from '@/utils/cn'
import { formatFileSize } from '@edgestore/react/utils'
import { DateTime } from 'luxon'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function PrivateGallery({
	images,
}: {
	images: EdgeStoreImage[]
}) {
	const { edgestore } = useEdgeStore()
	const router = useRouter()

	const handleAccept = async (url: string, filename: string) => {
		try {
			const result = await uploadImage(url, filename)

			if (result) {
				await edgestore.publicFiles.delete({ url: url })
				toast.success(`Uploaded successfully`)
			} else {
				toast.error(`Cannot upload file`)
			}
		} catch (error) {
			toast.error(error as string)
		}
		router.refresh()
	}
	const handleDeny = async (url: string) => {
		try {
			await edgestore.publicFiles.delete({ url: url })
			toast.success(`Removed successfully`)
		} catch (error) {
			toast.error(error as string)
		}
		router.refresh()
	}

	return (
		<div className=''>
			<div className='p-6'>
				<p className='text-3xl font-bold'>Submitted images</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6'>
					{images.map(
						({ url, filename, size, uploadedAt, author }) => (
							<div
								className='card w-full bg-base-300'
								key={filename}>
								<figure className='p-6'>
									<Image
										src={url}
										alt='image'
										loading='lazy'
										width={1920}
										height={1080}
									/>
								</figure>
								<div className='card-body'>
									<p className='text-xl truncate font-bold'>
										{
											filename.match(
												/(?:user_[^_]+-)(.*)/,
											)![1]
										}
									</p>
									<p className=''>By: {author}</p>
									<p className=''>
										On:{' '}
										{DateTime.fromISO(uploadedAt).toFormat(
											'LLLL dd, yyyy',
										)}
									</p>
									<p className=''>
										Size: {formatFileSize(size)}
									</p>

									<div className='card-actions justify-start'>
										<button
											className='btn btn-success group'
											onClick={() =>
												handleAccept(url, filename)
											}>
											<span
												className={cn(
													'loading loading-spinner loading-md hidden group-focus:block',
												)}></span>
											Accept
										</button>
										<button
											className='btn btn-error group'
											onClick={() => handleDeny(url)}>
											<span
												className={cn(
													'loading loading-spinner loading-md hidden group-focus:block',
												)}></span>
											Deny
										</button>
										<Link
											href={url}
											target='_blank'
											className='btn btn-warning'>
											View
										</Link>
									</div>
								</div>
							</div>
						),
					)}
				</div>
			</div>
		</div>
	)
}

export interface EdgeStoreImage {
	filename: string
	author: string
	url: string
	size: number
	uploadedAt: string
}
