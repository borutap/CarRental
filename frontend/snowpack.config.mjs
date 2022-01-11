// Example: snowpack.config.mjs
// The added "@type" comment will enable TypeScript type information via VSCode, etc.

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
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