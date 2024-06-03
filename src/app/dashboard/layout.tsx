import NavBar from '@/components/navbar'
import { EdgeStoreProvider } from '@/lib/edgestore'

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<EdgeStoreProvider>
			<NavBar />
			{children}
		</EdgeStoreProvider>
	)
}
