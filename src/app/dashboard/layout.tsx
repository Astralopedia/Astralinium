import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
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

	return <>{children}</>
}