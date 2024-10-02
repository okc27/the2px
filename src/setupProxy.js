const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/wp-content/uploads',
        createProxyMiddleware({
            target: 'http://localhost',
            changeOrigin: true,
        })
    );
};
