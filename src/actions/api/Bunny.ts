'use server'

import fetch from 'node-fetch'
import getUsernameById from '../clerk/getUsernameById'

export async function getImages(): Promise<ImageType[]> {
	const data = await (
		await fetch(
			`https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_NAME}/${process.env.BUNNY_STORAGE_FOLDER_NAME}/`,
			{
				method: 'GET',
				headers: {
					AccessKey: process.env.BUNNY_STORAGE_API_KEY!,
					'Content-Type': 'application/octet-stream',
				},
			},
		)
	).json()

	const images = await Promise.all(
		(data as any).map(async ({ ObjectName, DateCreated }: any) => ({
			name: ObjectName.match(/(?:user_[^_]+-)(.*)/)![1],
			author: await getUsernameById(
				ObjectName.match(/user_[a-zA-Z0-9]+/)![0],
			),
			url: `${process.env.BUNNY_CDN_URL}${process.env.BUNNY_STORAGE_FOLDER_NAME}/${ObjectName}`,
			datetime: DateCreated,
		})) as ImageType[],
	)

	return images
}

export async function uploadImage(url: string, filename: string) {
	const buffer = await (await fetch(url)).arrayBuffer()

	const result = await fetch(
		`https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_NAME}/${process.env.BUNNY_STORAGE_FOLDER_NAME}/${filename}`,
		{
			method: 'PUT',
			headers: {
				AccessKey: process.env.BUNNY_STORAGE_API_KEY!,
				'Content-Type': 'application/octet-stream',
			},
			body: Buffer.from(buffer),
		},
	)

	return result.ok
}

export interface ImageType {
	name: string
	author: string
	url: string
	datetime: string
}
