'use server'

import { createClient } from '@/utils/supabase/client'

const uploadFile = async (formData: FormData) => {
	const supabase = createClient()

	if (!formData.get('terms')) {
		return
	}
	const file: File = formData.get('file') as File
	const {
		data: { user },
	} = await supabase.auth.getUser()
	const { data, error } = await supabase.storage
		.from(process.env.SUPABASE_BUCKET!)
		.upload(`${user?.id}_${file.name}`, file)

	return { error: error }
}

export default uploadFile
