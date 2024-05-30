'use client'

import UploadForm from '@/components/ui/UploadForm'

export default function UploadFile() {
	return (
		<div className='w-full h-screen grid place-items-center'>
			<div className='bg-base-200 w-3/4 sm:w-2/4 md:w-2/5 p-10 rounded-2xl'>
				<h1 className='text-base-content text-3xl text-center'>
					Upload file
				</h1>
				<UploadForm />
			</div>
		</div>
	)
}
