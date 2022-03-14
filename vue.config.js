const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api/v1": {
        target: "https://witm.daminge.cf",
        pathRewrite: { "^/api/v1": "/api/v1" },
      },
    },
  },
});
