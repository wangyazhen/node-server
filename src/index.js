import Koa from 'koa';
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import koaStatic from 'koa-static';
import { Provider } from 'react-redux';
import App from './client/app';
import routes from './routes';
import createStore, { initialize } from './store';


const app = new Koa();

app.use(koaStatic(
  path.join(__dirname, '../dist')
));


app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} -- ${ms}`);
});

app.use(async (ctx, next) => {
  if (ctx.request.path === '/tags') {
    const tags = [{"id":45,"name":"资讯","categoryID":17,"categoryName":"推广","visible":true},{"id":35,"name":"公安部","categoryID":23,"categoryName":"政府机构","visible":false},{"id":34,"name":"最高检","categoryID":23,"categoryName":"政府机构","visible":false},{"id":33,"name":"最高法","categoryID":23,"categoryName":"政府机构","visible":false},{"id":32,"name":"农业农村部","categoryID":23,"categoryName":"政府机构","visible":false},{"id":31,"name":"全国人大","categoryID":23,"categoryName":"政府机构","visible":false},{"id":30,"name":"全国政协","categoryID":23,"categoryName":"政府机构","visible":false},{"id":29,"name":"生态环境部","categoryID":23,"categoryName":"政府机构","visible":false},{"id":28,"name":"外交部","categoryID":23,"categoryName":"政府机构","visible":false},{"id":27,"name":"国防部","categoryID":23,"categoryName":"政府机构","visible":false},{"id":26,"name":"发改委","categoryID":23,"categoryName":"政府机构","visible":false},{"id":25,"name":"金稳会","categoryID":23,"categoryName":"政府机构","visible":false},{"id":24,"name":"住建部","categoryID":23,"categoryName":"政府机构","visible":false},{"id":23,"name":"中金所","categoryID":23,"categoryName":"政府机构","visible":false},{"id":22,"name":"郑商所","categoryID":23,"categoryName":"政府机构","visible":false},{"id":21,"name":"大商所","categoryID":23,"categoryName":"政府机构","visible":false},{"id":20,"name":"上期所","categoryID":23,"categoryName":"政府机构","visible":false},{"id":19,"name":"深交所","categoryID":23,"categoryName":"政府机构","visible":false},{"id":18,"name":"上交所","categoryID":23,"categoryName":"政府机构","visible":false},{"id":17,"name":"外管局","categoryID":23,"categoryName":"政府机构","visible":false},{"id":16,"name":"证监会","categoryID":23,"categoryName":"政府机构","visible":false},{"id":15,"name":"银保监","categoryID":23,"categoryName":"政府机构","visible":false},{"id":14,"name":"中国央行","categoryID":23,"categoryName":"政府机构","visible":false},{"id":13,"name":"财政部","categoryID":23,"categoryName":"政府机构","visible":false},{"id":12,"name":"商务部","categoryID":23,"categoryName":"政府机构","visible":false},{"id":11,"name":"财经委","categoryID":23,"categoryName":"政府机构","visible":false},{"id":10,"name":"国务院","categoryID":23,"categoryName":"政府机构","visible":false},{"id":8,"name":"原创","categoryID":15,"categoryName":"盘中宝","visible":true},{"id":7,"name":"早盘提示","categoryID":15,"categoryName":"盘中宝","visible":true},{"id":6,"name":"信息追踪","categoryID":15,"categoryName":"盘中宝","visible":true},{"id":5,"name":"提醒","categoryID":15,"categoryName":"盘中宝","visible":true},{"id":4,"name":"独家","categoryID":15,"categoryName":"盘中宝","visible":true},{"id":3,"name":"盘中精选","categoryID":15,"categoryName":"盘中宝","visible":true},{"id":2,"name":"已证实","categoryID":15,"categoryName":"盘中宝","visible":true},{"id":1,"name":"待证实","categoryID":15,"categoryName":"盘中宝","visible":true}];
    ctx.body = tags;
  } else {
    await next()
  }
})

app.use(async ctx => {
  const store = createStore();
  store.dispatch(initialize());

  const dataRequirements = routes
    .filter(route => matchPath(ctx.url, route)) // 匹配route
    .map(route => route.component)
    .filter(component => component.serverFatch) // 检查是否有 serverFetch
    .map(comp => store.dispatch(comp.serverFatch())); // dispatch data requirement
  
  const time = Date.now();
  await Promise.all(dataRequirements);
  console.log('dataRequirements 执行完：%i ms', Date.now() - time, dataRequirements);
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
  console.log('body 相应完：%i ms', Date.now() - time);
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