/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'api.dicebear.com',
			},
			{
				hostname: 'jzqegimyakethcnqrtaf.supabase.co',
			},
		],
	},
}

export default nextConfig
