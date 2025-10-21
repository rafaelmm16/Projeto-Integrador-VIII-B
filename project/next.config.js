/** @type {import('next').NextConfig} */

// Substitua 'NOME_DO_SEU_REPOSITORIO' pelo nome exato do seu repo no GitHub
const repoName = 'Projeto-Integrador-VIII-B' 

const nextConfig = {
  reactStrictMode: true,
  
  /**
   * Habilita a exportação estática.
   * Isso criará uma pasta 'out/' com todo o seu site estático.
   */
  output: 'export',

  /**
   * Define o caminho base. Essencial para o GitHub Pages.
   * O GitHub Pages serve seu site em: https://[username].github.io/[repo-name]
   * O basePath informa ao Next.js para carregar assets (JS, CSS) a partir desse subdiretório.
   */
  basePath: `/${repoName}`,

  // Opcional, mas útil para imagens
  images: {
    unoptimized: true,
  },
}

export default nextConfig