'use server'

import fetch from 'node-fetch'

const getFilesFromBunny = async () => {
	const res = await fetch(
		`https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_NAME}/Astralinium/`,
		{
			method: 'GET',
			headers: {
				AccessKey: process.env.BUNNY_API_KEY!,
				'Content-Type': 'application/json',
			},
		},
	)

	return (await res.json()) as any[]
}

export default getFilesFromBunny
