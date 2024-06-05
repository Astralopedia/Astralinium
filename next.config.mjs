import MillionLint from '@million/lint';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: 'api.dicebear.com'
    }, {
      hostname: 'jzqegimyakethcnqrtaf.supabase.co' // development
    }, {
      hostname: 'files.edgestore.dev' // production
    }, {
      hostname: 'cdn.toby7002.dev'
    }, {
      hostname: 'dummyjson.com'
    }]
  }
};
export default MillionLint.next({
  rsc: true
})(nextConfig);