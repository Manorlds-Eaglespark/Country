const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath:  "/",
  parallel:true,

  pluginOptions:{
    env: {
      ROOT_API: process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "https://country-bite.herokuapp.com/",
    }
  },
  devServer: {
    open: process.platform === 'darwin', //CHANGE YOUR PORT HERE!
    // https: true,
    hotOnly: false,
    disableHostCheck: true
  },

  configureWebpack: {
    plugins: [new GenerateSW(),
    ]
  }
};
