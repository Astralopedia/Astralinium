import isCensor from '@/actions/isCensor'
import NavBar from '@/components/NavBar'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

export default async function GalleryLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/login')
	}

	return (
		<>
			<NavBar user={user} at='gallery' isCensor={await isCensor()} />
			{children}
		</>
	)
}
