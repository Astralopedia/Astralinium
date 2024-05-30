'use server'

import getNameById from '@/actions/getNameById'
import Card, { CardProps } from '@/components/ui/Card'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default async function Dashboard() {
	const cards: CardProps[] = []
	const supabase = await createClient()
	const bucket = supabase.storage.from(process.env.SUPABASE_BUCKET!)
	const { data, error } = await bucket.list()

	await Promise.all(
		(data as any[]).map(async data => {
			if (/^image\/(png|jpg|gif|jpeg)$/.test(data.metadata.mimetype)) {
				cards.push({
					imageUrl: bucket.getPublicUrl(data.name).data.publicUrl,
					author: await getNameById(data.name.split('_')[0]),
					filename: data.name,
				})
			}
		}),
	)

	return (
		<div className='w-full h-screen'>
			{cards.length === 0 ? (
				<div className='w-full h-full grid place-content-center'>
					<div className='w-full h-full grid place-items-center gap-6'>
						<p className='text-center text-4xl'>
							No more new images
						</p>
						<Link
							href='/dashboard'
							className='btn btn-secondary text-white'>
							Refresh
						</Link>
					</div>
				</div>
			) : (
				<div className='grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-12 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6'>
					{cards.map(({ imageUrl, author, filename }) => {
						return (
							<Card
								imageUrl={imageUrl}
								author={author}
								filename={filename}
								key={filename}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}
