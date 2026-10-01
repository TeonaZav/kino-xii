import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       include: [/components\/icons\/.*\.svg$/], // this allows icon.svg in app dir to work. All SVGs to be handled by SVGR are in src/assets
//       use: ["@svgr/webpack"],
//     });

//     return config;
//   },
//   turbopack: {
//     rules: {
//       "*.svg": {
//         loaders: ["@svgr/webpack"],
//         as: "*.js",
//       },
//     },
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
//   skipTrailingSlashRedirect: true,
// };

// export default nextConfig;
