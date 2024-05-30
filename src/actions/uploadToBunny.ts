'use server'

import fetch from 'node-fetch'
import deleteFile from './deleteFile'

const uploadToBunny = async (filename: string, imageUrl: string) => {
	const buffer = await (await fetch(imageUrl)).arrayBuffer()

	const res = await fetch(
		`https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_NAME}/${filename}`,
		{
			method: 'PUT',
			headers: {
				AccessKey: process.env.BUNNY_API_KEY!,
				'Content-Type': 'application/octet-stream',
			},
			body: Buffer.from(buffer),
		},
	)

	await deleteFile([filename])

	return res.status
}

export default uploadToBunny
