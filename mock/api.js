var mysqlHandle = require("./mysql");
var sqlWord = require("./sqlWord");
var until = require("../src/common/until");
module.exports = {
  api: function(router) {
    router.get("/getSqlData", async function(ctx) {
      ctx.set("Content-Type", "application/json");
      // 告诉服务器请求的主题内容是json格式的字符串，服务器端会对json字符串进行解析

      let data = await mysqlHandle.exec(
        sqlWord.select("name, url", "websites")
      );

      ctx.body = {
        data
      };
    });
    router.post("/addSqlData", async function(ctx) {
      let request = ctx.request.body;
      let params = until.handleObjData(request);
      let sql = sqlWord.insert(params, "websites");
      await mysqlHandle.exec(sql);
      ctx.body = {
        msg: "新增成功"
      };
    });
    router.post("/deleteSqlData", async function(ctx) {
      let request = ctx.request.body;
      let params = until.handleObjData(request);
      let sql = sqlWord.delete(params, "websites");
      console.log("sql-=-=-=", sql);
      await mysqlHandle.exec(sql);
      ctx.body = {
        msg: "删除成功"
      };
    });
  }
};

// connection.end();
