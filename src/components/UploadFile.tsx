'use client'

import { useEdgeStore } from '@/lib/edgestore'
import cn from '@/utils/cn'
import { formatFileSize } from '@edgestore/react/utils'
import { FileIcon, Trash2, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

export default function UploadFile({ userId }: { userId: string }) {
	const [files, setFiles] = useState<(File & { url: string })[]>([])
	const [isLoading, setLoading] = useState<boolean>(false)
	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (acceptedFiles.length) {
				setFiles(previousFiles => [
					...previousFiles,
					...acceptedFiles.map(file =>
						Object.assign(file, {
							url: URL.createObjectURL(file),
						}),
					),
				])
			}

			if (fileRejections.length) {
				toast.error(
					`${fileRejections.length} failed to upload. We only accept images`,
				)
			}
		},
		[],
	)
	const { getInputProps, getRootProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': [],
		},
		maxSize: 262144000, // 250MB
	})
	const { edgestore } = useEdgeStore()
	const removeFile = (name: string) => {
		setFiles(previousFiles =>
			previousFiles.filter(file => file.name !== name),
		)
	}
	const handleSubmit = async () => {
		setLoading(true)
		await Promise.all(
			files.map(async file => {
				try {
					await edgestore.publicFiles.upload({
						file: file,
						options: {
							manualFileName: `${userId}-${file.name}`,
						},
					})
					removeFile(file.name)
					toast.success(`${files.length} files uploaded successfully`)
				} catch (error) {
					toast.error(`${error}`)
				}
			}),
		)
		setLoading(false)
	}

	return (
		<div className='w-full max-w-5xl h-full grid place-items-center p-6'>
			<div
				className='text-center border-dashed border-2 border-base-content p-6 rounded-2xl w-full'
				{...getRootProps()}>
				<FileIcon className='w-16 h-16 mx-auto my-2' />
				<input {...getInputProps()} />
				<p className='text-2xl my-3'>
					{isDragActive ? (
						<p>Drop the files here</p>
					) : (
						<p>
							Drag &apos;n&apos; drop some files here, or click to
							select files
						</p>
					)}
				</p>
				<button className='btn bg-base-300'>Select files</button>
			</div>
			<div
				className={cn('w-full grid grid-cols-1 gap-6', {
					'my-6': files.length > 0,
				})}>
				{files.map(file => (
					<div
						className='bg-base-300 w-full rounded-2xl p-6 grid grid-cols-5'
						key={file.name}>
						<div className='my-8 md:my-0 w-48 md:w-24 col-span-5 md:col-span-2 lg:col-span-1 self-center mx-auto'>
							<Image
								src={file.url}
								alt={file.name}
								width={1280}
								height={1080}
								className='rounded-xl'
							/>
						</div>
						<div className='col-span-5 md:col-span-2 lg:col-span-3'>
							<p className='text-lg'>{file.name}</p>
							<p className='text-md text-zinc-400'>
								{formatFileSize(file.size)}
							</p>
						</div>
						<div
							className='col-span-5 lg:col-span-1 h-full w-full grid place-items-center'
							onClick={() => removeFile(file.name)}>
							<Trash2 className='w-10 h-10 cursor-pointer' />
						</div>
					</div>
				))}
				<form
					className={cn('w-full mt-6', {
						hidden: files.length == 0,
					})}
					action={handleSubmit}>
					<button
						className='btn btn-success w-full rounded-2xl'
						type='submit'
						onClick={() => setLoading(true)}>
						<span
							className={cn(
								'loading loading-spinner loading-md hidden',
								{ block: isLoading },
							)}></span>
						<UploadCloud className={cn({ hidden: isLoading })} />
						Upload Files
					</button>
				</form>
			</div>
		</div>
	)
}
