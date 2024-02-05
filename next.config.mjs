/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.externals = {
      flvjs: 'flv.js',
      Hls: 'hls.js',
      Artplayer: 'artplayer',
    };
    return config;
  },
};

export default nextConfig;
