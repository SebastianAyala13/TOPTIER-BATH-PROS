import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para optimización de videos
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // Headers específicos para videos MP4
  async headers() {
    return [
      {
        source: '/(.*).mp4',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, HEAD, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Range',
          },
        ],
      },
      {
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Configuración de webpack para manejo de videos
  webpack: (config, { isServer }) => {
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

  // Configuración de imágenes y assets
  images: {
    domains: ['bathroom.homedesignandco.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Configuración de compresión
  compress: true,

  // Configuración de powerdBy
  poweredByHeader: false,

  // Configuración de trailing slash
  trailingSlash: false,

  // Configuración de base path (si es necesario)
  // basePath: '',

  // Configuración de asset prefix (si es necesario)
  // assetPrefix: '',
};

export default nextConfig;
