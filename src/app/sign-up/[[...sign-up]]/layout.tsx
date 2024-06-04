import NavBar from '@/components/NavBar'

export default function PageLayout({
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
