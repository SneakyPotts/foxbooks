/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    // config.infrastructureLogging = { debug: /PackFileCache/ };

    /*SVGR SETTINGS*/
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    /*SVGR SETTINGS*/

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'loveread.ec',
      'loveread.webnauts.pro',
      's1.knigavuhe.org',
      's2.knigavuhe.org',
      's3.knigavuhe.org',
      's4.knigavuhe.org',
      's5.knigavuhe.org',
      's6.knigavuhe.org',
      's7.knigavuhe.org',
      's8.knigavuhe.org',
      's9.knigavuhe.org',
      's10.knigavuhe.org',
      's11.knigavuhe.org',
      's12.knigavuhe.org',
      's13.knigavuhe.org',
      's14.knigavuhe.org',
      's15.knigavuhe.org',
      'api.foxbooks.ec',
    ],
  },
};
