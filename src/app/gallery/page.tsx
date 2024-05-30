'use server'

import getFilesFromBunny from '@/actions/getFilesFromBunny'
import getNameById from '@/actions/getNameById'
import GalleryContainer from '@/components/ui/GalleryContainer'
import { createClient } from '@/utils/supabase/client'

export default async function Gallery() {
	const userFiles: BunnyFile[] = []
	const otherFiles: BunnyFile[] = []
	const supabase = createClient()
	const userId = (await supabase.auth.getUser()).data.user?.id

	await Promise.all(
		((await getFilesFromBunny()) as any[]).map(async file => {
			if (file.ObjectName.split('_')[0] == userId) {
				userFiles.push({
					name: file.ObjectName,
					url: `${process.env.BUNNY_CDN_URL}/${encodeURIComponent(file.ObjectName)}`,
					author: await getNameById(file.ObjectName.split('_')[0]),
				})
			} else {
				otherFiles.push({
					name: file.ObjectName,
					url: `${process.env.BUNNY_CDN_URL}/${encodeURIComponent(file.ObjectName)}`,
					author: await getNameById(file.ObjectName.split('_')[0]),
				})
			}
		}),
	)

	return (
		<div className=''>
			<GalleryContainer userFiles={userFiles} otherFiles={otherFiles} />
		</div>
	)
}

export interface BunnyFile {
	name: string
	url: string
	author: string
}
