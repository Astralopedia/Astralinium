'use client'

import { ImageType } from '@/actions/api/Bunny'
import copy from 'copy-to-clipboard'
import { DateTime } from 'luxon'
import Image from 'next/image'
import Link from 'next/link'

export default function MyGallery({ images }: { images: ImageType[] }) {
	return (
		<div className=''>
			<div className='p-6'>
				<p className='text-3xl font-bold'>My gallery</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6'>
					{images.map(({ url, name, datetime }) => (
						<div className='card w-full bg-base-300' key={name}>
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
								<span className='card-title'>{name}</span>
								<span className=''>
									on{' '}
									{DateTime.fromISO(datetime).toFormat(
										'LLLL dd, yyyy',
									)}
								</span>

								<div className='card-actions justify-start'>
									<Link
										href={url}
										className='btn btn-warning'
										target='_blank'>
										View
									</Link>
									<button
										className='btn btn-info'
										onClick={() => copy(url)}>
										Copy URL
									</button>
									<button
										className='btn btn-error'
										onClick={() => copy(url)}>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
