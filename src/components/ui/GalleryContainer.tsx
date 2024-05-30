'use client'

import { BunnyFile } from '@/app/gallery/page'
import copy from 'copy-to-clipboard'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function GalleryContainer({
	userFiles,
	otherFiles,
}: GalleryProps) {
	const [showUserFiles, setShowUserFiles] = useState<boolean>(false)
	const [items, setItems] = useState<BunnyFile[]>([])

	useEffect(() => {
		setItems(showUserFiles ? userFiles : [...userFiles, ...otherFiles])
	}, [otherFiles, showUserFiles, userFiles])

	return (
		<div className='p-12'>
			<div className='form- w-64'>
				<label className='label cursor-pointer'>
					<span className='label-text'>Only show my files</span>
					<input
						type='checkbox'
						className='toggle'
						defaultChecked={showUserFiles}
						onClick={() => setShowUserFiles(!showUserFiles)}
					/>
				</label>
			</div>
			<div className=''>
				<div className='grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-12 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
					{items.map(item => (
						<div
							className='card bg-base-200 cursor-pointer w-96 sm:w-80'
							key={item.name}>
							<figure className='px-10 pt-10'>
								<Image
									src={item.url}
									alt='img'
									className='rounded-xl'
									width={384}
									height={277}
								/>
							</figure>
							<div className='card-body items-center text-center'>
								<p>
									Upload by{' '}
									<span className='font-bold'>
										{item.author}
									</span>
								</p>
								<div className='inline-flex gap-3 justify-center items-center'>
									<button
										className='w-1/2 h-full btn btn-accent text-white'
										onClick={() => {
											copy(item.url)
										}}>
										Copy URL
									</button>
									<Link
										href={item.url}
										target='_blank'
										className='w-1/2 h-full btn btn-secondary text-white'
										onClick={() => {
											copy(item.url)
										}}>
										View image
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

interface GalleryProps {
	userFiles: BunnyFile[]
	otherFiles: BunnyFile[]
}
