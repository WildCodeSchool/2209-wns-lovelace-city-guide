const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://back-end:4000',
            changeOrigin: true,
        })
    )
    app.use(
        '/uploader',
        createProxyMiddleware({
            target: 'http://file-uploader-service:5000',
            changeOrigin: true,
        })
    )
};