const path = require('path')
const webpack = require('webpack')

/**
 * Configure Storybook.
 *
 * @see https://storybook.js.org/docs/react/configure/overview
 */
module.exports = {
  core: {
    builder: 'webpack5'
  },
  typescript: {reactDocgen: false},
  stories: ['../components/**/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    'storybook-addon-apollo-client'
  ],
  webpackFinal: async (config) => {
    // config.resolve.modules = [
    //   path.resolve(__dirname, '..', )
    // ]
    //
    // Enable @ symbol aliases.
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../')
    }

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', 'resolve-url-loader'],
      include: path.resolve(__dirname, '../')
    })

    // Enable Next.js <Image /> component support.
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          domains: [
            'dickson2021prd.wpengine.com',
            'dickson21stage.wpengine.com',
            'dickson21dev.wpengine.com',
            'dickson.local'
          ],
          path: '/',
          loader: 'default'
        })
      })
    )

    return config
  }
}
