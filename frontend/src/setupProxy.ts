import { RequestHandler, createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: { use: (arg0: RequestHandler) => void }) {
  app.use(
    createProxyMiddleware("/vitoo", {
      target: "https://openapi.vito.ai",
      pathRewrite: {
        "^/vito": "",
      },
      changeOrigin: true,
    })
  );
};
