'use client'

import deleteFile from '@/actions/deleteFile'
import uploadToBunny from '@/actions/uploadToBunny'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Card({ imageUrl, author, filename }: CardProps) {
	const router = useRouter()
	const handleDeny = async () => {
		const result = await deleteFile([filename])

		if (result?.error) {
			toast.error(result.error.message)
		} else {
			toast.success('File deleted successfully')
			router.refresh()
		}
	}
	const handleAccept = async () => {
		const result = await uploadToBunny(filename, imageUrl)

		if (result !== 200) {
			toast.error("Cannot upload image to Bunny storage")
		} else {
			toast.success('File uploaded successfully')
			router.push('/dashboard')
		}
		toast.error('This feature is being developed')
	}

	return (
		<div className='card bg-base-200 cursor-pointer w-96 sm:w-80'>
			<figure className='px-10 pt-10'>
				<Image
					src={imageUrl}
					alt='img'
					className='rounded-xl'
					width={384}
					height={277}
				/>
			</figure>
			<div className='card-body items-center text-center'>
				<p>
					Upload by <span className='font-bold'>{author}</span>
				</p>
				<div className='inline-flex gap-3 justify-center items-center'>
					<form
						action={handleAccept}
						className='btn btn-success text-white w-1/3'>
						<button className='w-full h-full' type='submit'>
							Accept
						</button>
					</form>
					<form
						action={handleDeny}
						className='btn btn-error text-white w-1/3'>
						<button className='w-full h-full' type='submit'>
							Deny
						</button>
					</form>
					<Link
						href={imageUrl}
						target='_blank'
						className='btn btn-primary text-white w-1/3'>
						View image
					</Link>
				</div>
			</div>
		</div>
	)
}

export interface CardProps {
	imageUrl: string
	author: string
	filename: string
}
