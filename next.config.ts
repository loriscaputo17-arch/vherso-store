const nextConfig = {
  async redirects() {
    return [
      {
        source: '/account',
        destination: 'https://vhersoclo.com/account',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
