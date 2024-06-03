import NavBar from '@/components/navbar'

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
