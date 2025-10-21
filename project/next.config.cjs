// Exemplo para next.config.cjs
const repoName = 'Projeto-Integrador-VIII-B'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: `/${repoName}`,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig