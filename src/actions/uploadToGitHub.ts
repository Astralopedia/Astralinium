'use server'

import deleteFile from './deleteFile'

const uploadToGitHub = async (filename: string, imageUrl: string) => {
	await deleteFile([filename])
}

export default uploadToGitHub
