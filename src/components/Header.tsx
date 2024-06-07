import { BookImage } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
	return (
		<div className='w-full h-screen grid place-items-center'>
			<div className='container text-center'>
				<p className='text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold'>
					The{' '}
					<span className='bg-orange-400 bg-clip-text text-transparent'>
						storage
					</span>{' '}
					for{' '}
					<span className='bg-[#c382f0] bg-clip-text text-transparent'>
						Astralopedia
					</span>
				</p>
				<p className='text-lg sm:text-xl md:text-2xl my-6 w-2/3 mx-auto'>
					Astralinium is a storage where users upload their images and
					Create&apos;s schematic files and deliver them faster than
					ever before
				</p>
				<div className='inline-flex flex-col sm:flex-row gap-3 w-2/3 justify-center'>
					<Link
						href='/gallery'
						className='btn btn-secondary rounded-xl w-full sm:w-auto'>
						<BookImage />
						View Gallery
					</Link>
				</div>
			</div>
		</div>
	)
}
