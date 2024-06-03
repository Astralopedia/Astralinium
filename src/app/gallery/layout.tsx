import NavBar from '@/components/navbar'

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
