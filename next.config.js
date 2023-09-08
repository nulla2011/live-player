/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({ flvjs: 'flv.js', Hls: 'hls.js', Artplayer: 'artplayer' });
    }
    return config;
  },
};

module.exports = nextConfig;
