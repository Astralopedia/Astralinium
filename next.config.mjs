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
				hostname: 'dxijzrgcudnteqgwjono.supabase.co', // production
			},
		],
	},
}

export default nextConfig
