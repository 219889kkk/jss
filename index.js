const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  ["/api", "/public"],
  createProxyMiddleware({
    target: "https://api777999.xd796251.icu", // 原地址
    changeOrigin: true,
    secure: false,
    pathRewrite: (path, req) => {
      if (path.startsWith("/api")) {
        return path.replace(/^\/api/, "/api");
      } else if (path.startsWith("/public")) {
        return path.replace(/^\/public/, "/public");
      }
      return path; // 默认返回原始路径
    },
  })
);

// 启动服务器，监听指定端口
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
