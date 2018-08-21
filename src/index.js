import Koa from 'koa';
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import koaStatic from 'koa-static';
import { Provider } from 'react-redux';
import App from './client/app';
import createStore, { initialize } from './store';


const app = new Koa();

app.use(koaStatic(
  path.join(__dirname, '../dist')
))


app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} -- ${ms}`);
});

app.use(async ctx => {
  const store = createStore();
  store.dispatch(initialize());

  const jsx = (
    <Provider store={store}>
      <StaticRouter context={{}} location={ctx.url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const reduxState = store.getState();
  const bodystr = renderToString( jsx );  
  ctx.body = htmlTemplate(bodystr, reduxState);
});

app.listen(1337)

function htmlTemplate( reactDom, reduxState ) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="root">${ reactDom }</div>
          <script>
            window.__PRELOADED_DATA = ${JSON.stringify(reduxState)}
          </script>
          <script src="/client/app.bundle.js"></script>
      </body>
      </html>
  `;
}

console.log('Server running at http://127.0.0.1:1337/');