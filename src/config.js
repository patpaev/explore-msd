require('babel/polyfill');

const environment = {
  development: {
    isProduction: false,
    apiServer: 'https://api.explore.msd.unimelb.edu.au',
  },
  production: {
    isProduction: true,
    apiServer: 'https://api.explore.msd.unimelb.edu.au',
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.APIPORT,
  host: process.env.PREFERRED_HOST,
  cloudfrontDistribution: process.env.CLOUDFRONT_DISTRIBUTION,
  apiPath: '/api',
  app: {
    title: 'Explore the Melbourne School of Design',
    description: 'A living learning building, the Melbourne School of Design sets a new standard for design education in the Asia-Pacific region.',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Explore the Melbourne School of Design',
        'og:image': 'http://explore.msd.unimelb.edu.au/explore_msd_logo.jpg',
        'og:image:type': 'image/jpeg',
        'og:image:width': '1200',
        'og:image:height': '630',
        'og:locale': 'en_US',
        'twitter:card': 'summary_large_image',
        'twitter:site': '@msdsocial',
        'twitter:creator': '@msdsocial',
      }
    }
  }
}, environment);
