import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { EdgeStoreProvider } from '@/lib/edgestore'
import cn from '@/utils/cn'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const metadata: Metadata = {
	title: 'Astralinium',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider appearance={{ baseTheme: dark }}>
			<EdgeStoreProvider>
				<html lang='en' suppressHydrationWarning>
					<body
						className={cn(
							'min-h-screen font-sans antialiased',
							fontSans.variable,
						)}>
						<ThemeProvider
							themes={[
								'light',
								'dark',
								'dracula',
								'black',
								'night',
							]}>
							<NavBar />
							{children}
							<Footer />
							<Toaster
								position='top-right'
								richColors
								theme='dark'
							/>
						</ThemeProvider>
					</body>
				</html>
			</EdgeStoreProvider>
		</ClerkProvider>
	)
}
