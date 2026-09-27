// Empty on Cloudflare/Vercel (site at the domain root); "/pro" on GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  // Third-party packages ship modern syntax; compile them down to the
  // browserslist targets in package.json so older phones can parse the bundles.
  transpilePackages: ['lenis', 'gsap', '@gsap/react', 'lucide-react'],
};

module.exports = nextConfig;
