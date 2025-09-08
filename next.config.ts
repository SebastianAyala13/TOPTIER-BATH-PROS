/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',             // genera /out estático
  images: { unoptimized: true}, // permite next/image sin servidor
  trailingSlash: true,          // evita 404 en hosting estático
  reactStrictMode: true,
  
  // Configuración para optimización de videos
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // Configuración de webpack para manejo de videos
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    // Configuración específica para archivos de video
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },

  // Configuración de powerdBy
  poweredByHeader: false,
};

export default nextConfig;
