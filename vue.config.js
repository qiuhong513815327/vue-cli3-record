module.exports = {
  devServer: {
    port: 8485,
    https: false,
    open: true,
    proxy: {
      "/": {
        target: "http://localhost:3000",
        // target一般为后端的接口地址，本地mock就直接写localhost拼接mock默认的端口号
        ws: false,
        // 不允许websocket
        changeOrigin: true
        // 允许跨域
      }
    }
  }
};
