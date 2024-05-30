'use client'

import uploadFile from '@/actions/uploadFile'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function UploadForm() {
	const [isSubmit, setIsSubmit] = useState<boolean>(false)
	const [file, setFile] = useState<File | null>(null)
	const [checkbox, setCheckbox] = useState<boolean>(false)

	const handleSubmit = async (formData: FormData) => {
		const result = await uploadFile(formData)

		if (result?.error) {
			toast.error(result.error.message)
		} else {
			toast.success('File uploaded successfully')
			setFile(null)
		}
		setIsSubmit(false)
	}

	return (
		<form
			action={handleSubmit}
			className='w-full h-full grid place-items-center py-8'>
			<div className='form-control justify-center items-center'>
				<input
					type='file'
					className='file-input file-input-bordered w-full max-w-xs'
					accept='.png,.jpg,.gif,.nbt'
					name='file'
					multiple={false}
					required
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (e.target.files) {
							setFile(e.target.files[0])
						}
					}}
				/>
				<label className='label cursor-pointer'>
					<span className='label-text'>
						Any legal action taken on any images that you upload, is
						directed at you, and not the developers or project. By
						checking the box below. You agree to these terms.
					</span>
					<input
						type='checkbox'
						defaultChecked={checkbox}
						onClick={() => setCheckbox(!checkbox)}
						className='checkbox bg-base-100 my-6'
						name='terms'
						required
					/>
				</label>
				<button
					className='btn bg-[#bd93f9] hover:bg-[#bd93f9] w-full hover:brightness-125 text-white'
					onClick={() => {
						if (checkbox && file) {
							setIsSubmit(true)
						}
					}}
					type='submit'>
					{isSubmit ? (
						<span className='loading loading-spinner'></span>
					) : (
						<span className='i-fa6-solid-upload w-6 h-6'></span>
					)}
					Upload
				</button>
			</div>
		</form>
	)
}
