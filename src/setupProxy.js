const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://happybob.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'https://happybobchat.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/dialogs',
    createProxyMiddleware({
      target: 'https://happybobchat.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/messages',
    createProxyMiddleware({
      target: 'https://happybobchat.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/files',
    createProxyMiddleware({
      target: 'https://happybobchat.herokuapp.com/',
      changeOrigin: true,
    })
  );
};