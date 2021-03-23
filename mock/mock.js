// index.js
const Koa = require("koa");
const Router = require("koa-router");
const KoaBody = require("koa-body"); // multipart:true, // 支持文件上传
const fs = require("fs");
const path = require("path");
const app = new Koa();
const router = new Router();
KoaBody({ multipart: true });
// app.use(require("koa-static")(__dirname + "/mock"));

// let data = fs.readFileSync("./data.json", "utf-8").toString();
let data = fs.readFileSync(path.resolve(__dirname, "data.json"), "utf-8");

router.get("/check/getCheckInfo", function(ctx) {
  ctx.set("Content-Type", "application/json");
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = data;
  // next();
});
// 当接口比较多的时候，可以用module.export暴露接口文件
// require('./api.js')(router)

app
  .use(KoaBody())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server is starting at port 3000");
});
