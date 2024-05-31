/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'api.dicebear.com',
			},
			{
				hostname: 'jzqegimyakethcnqrtaf.supabase.co', // development
			},
			{
				hostname: 'umvgbjvnebibgyktquus.supabase.co', // production
			},
			{
				hostname: 'cdn.toby7002.dev',
			},
		],
	},
	experimental: {
		reactCompiler: true
	}
}

export default nextConfig
