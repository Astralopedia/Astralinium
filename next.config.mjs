import MillionLint from '@million/lint'
import NextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = NextBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'files.edgestore.dev', // production
			},
			{
				hostname: 'cdn.toby7002.dev',
			},
		],
	},
}
export default withBundleAnalyzer(
	MillionLint.next({
		rsc: true,
	})(nextConfig),
)
