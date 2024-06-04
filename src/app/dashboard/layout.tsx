import NavBar from '@/components/NavBar'
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
