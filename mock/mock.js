const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const app = new Koa();
const router = new Router();

const KoaBody = require("koa-body"); // multipart:true 支持文件上传, patchKoa: true 获取请求体
app.use(KoaBody({ multipart: true, patchKoa: true }));

// 设置跨域
app.use(require("./allowCors.js"));
// 引入接口
const nodeApi = require("./api.js");
nodeApi.api(router);

let data = fs
  .readFileSync(path.resolve(__dirname, "data.json"), "utf-8")
  .toString();

router.get("/check/getCheckInfo", ctx => {
  ctx.set("Content-Type", "application/json");
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = data;
});
router.get("/getSearch", async ctx => {
  await new Promise(res => {
    setTimeout(() => {
      res();
    }, 2000);
  });
  ctx.set("Content-Type", "application/json");
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = {
    code: "200",
    data: [
      { name: "第一条数据" },
      { name: "第二条数据" },
      { name: "第三条数据" },
      { name: "第四条数据" },
      { name: "第五条数据" },
      { name: "第六条数据" }
    ],
    date: "2020-05-17",
    msg: "请求成功",
    timestamp: 17322213467
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server is starting at port 3000");
});
