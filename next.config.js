/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Third-party packages ship modern syntax; compile them down to the
  // browserslist targets in package.json so older phones can parse the bundles.
  transpilePackages: ['lenis', 'gsap', '@gsap/react', 'lucide-react'],
};

module.exports = nextConfig;
