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
      {
        source: '/cart/:path*',
        destination: 'https://y0m1fz-g0.myshopify.com/cart/:path*',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
