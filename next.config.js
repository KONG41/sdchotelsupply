/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["img.icons8.com"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.4',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'daerleng.site',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sdchotelsupply-xi.vercel.app',
        port: '',
      },
    ],
  },
};

export default config;
