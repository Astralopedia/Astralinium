'use client'

import copy from 'copy-to-clipboard'
import { DateTime } from 'luxon'
import Image from 'next/image'
import Link from 'next/link'

export default function Card({ image, name, author, uploadDate }: CardProp) {
	return (
		<div className='card w-full bg-base-200'>
			<figure className='p-6'>
				<Image
					src={image}
					alt='image'
					loading='lazy'
					width={1920}
					height={1080}
				/>
			</figure>
			<div className='card-body'>
				<span className='card-title truncate'>{name}</span>
				<span className=''>by {author}</span>
				<span className=''>
					on {DateTime.fromISO(uploadDate).toFormat('LLLL dd, yyyy')}
				</span>

				<div className='card-actions justify-start'>
					<Link
						href={image}
						className='btn btn-warning'
						target='_blank'>
						View
					</Link>
					<button
						className='btn btn-info'
						onClick={() => copy(image)}>
						Copy URL
					</button>
				</div>
			</div>
		</div>
	)
}

export interface CardProp {
	image: string
	name: string
	author: string
	uploadDate: string
}
