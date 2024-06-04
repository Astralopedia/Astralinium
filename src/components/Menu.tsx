'use client'

import { searchParams } from '@/app/dashboard/searchParams'
import cn from '@/utils/cn'
import { Protect } from '@clerk/nextjs'
import { BookImage, Paintbrush, Search, UploadCloud } from 'lucide-react'
import { useQueryState } from 'nuqs'

export default function Menu() {
	const [type, setType] = useQueryState(
		't',
		searchParams.t.withOptions({
			shallow: false,
		}),
	)

	return (
		<ul className='menu bg-base-200 w-full rounded-2xl font-semibold'>
			<Protect role='org:admin'>
				<li className={cn({ active: type === 'review-images' })}>
					<button
						className=''
						onClick={() => setType('review-images')}>
						<Search />
						Review images
					</button>
				</li>
			</Protect>

			<li className={cn({ active: type === 'my-gallery' })}>
				<button className='' onClick={() => setType('my-gallery')}>
					<BookImage />
					My gallery
				</button>
			</li>
			<li className={cn({ active: type === 'upload-files' })}>
				<button className='' onClick={() => setType('upload-files')}>
					<UploadCloud />
					Upload files
				</button>
			</li>
			<li className={cn({ active: type === 'appearance' })}>
				<button className={''} onClick={() => setType('appearance')}>
					<Paintbrush />
					Appearance
				</button>
			</li>
		</ul>
	)
}
