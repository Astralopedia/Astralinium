'use server'

import { ImageType } from '@/actions/api/Bunny'
import Card from './card'

export interface CardContainerProps {
	images: ImageType[]
	search: string
}

export default async function CardContainer({
	search,
	images,
}: CardContainerProps) {
	return (
		<div className='w-11/12 mx-auto h-full grid place-items-center'>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
				{images
					.filter(image => {
						return search.toLowerCase() === ''
							? image
							: image.name.toLowerCase().includes(search)
					})
					.map(image => (
						<Card
							image={image.url}
							name={image.name}
							author={image.author}
							uploadDate={image.datetime}
							key={image.name}
						/>
					))}
			</div>
		</div>
	)
}
