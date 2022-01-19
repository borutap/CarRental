// Example: snowpack.config.mjs
// The added "@type" comment will enable TypeScript type information via VSCode, etc.

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  env: {
    DEV_API_URL: 'https://localhost:44329',
    API_URL: '',
    DEV_GOOGLE_CLIENT: '438661257726-oqgj0dm34f9cdivvucr4evlf2ppk90je.apps.googleusercontent.com',
    GOOGLE_CLIENT: '',
  },
  packageOptions: {
    polyfillNode: true
  },
  mount: {
    // directory name: 'build directory'
    public: '/',
    src: '/dist',
  },
  plugins: ['@snowpack/plugin-sass'],
  routes: [
    {
      // robimy Single Page Application (SPA)
      // wszystko przekierowane do index.html
      match: 'routes',
      src: '.*',
      dest: '/index.html',  
      // bedzie trzeba dodac nowa regule do /api/      
    },
  ],
  alias: {
    '@components': './src/components',
    '@assets': './src/assets',
    '@styles': './src/styles',
    '@lib': './src/lib'
  }
};