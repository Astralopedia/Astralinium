'use server'

import fetch from 'node-fetch'

const getFilesFromBunny = async () => {
	const res = await fetch(
		`https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_NAME}/astralinium/`,
		{
			method: 'GET',
			headers: {
				AccessKey: process.env.BUNNY_API_KEY!,
				'Content-Type': 'application/json',
			},
		},
	)

	return res.body
}

export default getFilesFromBunny
