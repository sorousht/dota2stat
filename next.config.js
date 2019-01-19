const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

module.exports = withTypescript(withCss(withSass({
  webpack(config, options) {
    // Further custom configuration here
    
    return config
  }
})));