# example node server with babel

用`babel` 搭建的`ndoe` 后端初始 `ES6` 项目

## 使用Koa 后端搭建的react 服务端渲染

主要用的技术 `redux`, `redux-saga`
另外也有 `redux-thunk` 的方案 可查看 `release` 里面的 `fetchData` 标签

`saga` 服务端的阻塞方案查看 `sagaPending` 标签

## 运行
```
npm start 
```

## 监听改变运行
```
npm run watch
```

## 部署
```
npm run build
```
默认生成到 `dist` 目录
发布的时候只需要把 `dist` 目录部署到服务器就可以了