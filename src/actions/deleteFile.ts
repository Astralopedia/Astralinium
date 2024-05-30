'use server'

import { createClient } from '@/utils/supabase/client'

const deleteFile = async (filenames: string[]) => {
	const supabase = createClient()

	const { data, error } = await supabase.storage
		.from(process.env.SUPABASE_BUCKET!)
		.remove(filenames)
	return {
		error: error,
	}
}

export default deleteFile
