/** @type {import('next').NextConfig} */

const repoName = 'Projeto-Integrador-VIII-B'

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: `/${repoName}`,
  images: {
    unoptimized: true,
  },

  eslint: {
    // Permite que o build seja concluído mesmo com avisos de ESLint.
    ignoreDuringBuilds: true,
  },
}

export default nextConfig