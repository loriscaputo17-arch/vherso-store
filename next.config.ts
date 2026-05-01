const nextConfig = {
  async redirects() {
    return [
      {
        source: '/en/products/:handle',
        destination: '/products/:handle',
        permanent: true,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/account',
        destination: 'https://vhersoclo.com/account',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
