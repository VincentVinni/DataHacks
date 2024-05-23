/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //   domains: ['jhjxvhhavsxmgnjbrmbn.supabase.co'],
    // },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'jhjxvhhavsxmgnjbrmbn.supabase.co',
          pathname: '**',
        },
      ],
    },
  };
  
  export default nextConfig;