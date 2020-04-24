const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/vuejs-pwa/" : "/",
  parallel:true,

  pluginOptions:{
    env: {
      ROOT_API: process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "https://country-bite.herokuapp.com/",
    }
  },

  configureWebpack: {
    plugins: [new GenerateSW(),
    ]
  }
};
