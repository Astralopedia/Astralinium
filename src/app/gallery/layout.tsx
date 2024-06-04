import NavBar from '@/components/NavBar'

export default function LayoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<NavBar />
			{children}
		</>
	)
}
