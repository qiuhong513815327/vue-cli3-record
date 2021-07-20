// 写个中间件，来允许跨域
async function allowCORS(ctx, next) {
  // console.log(ctx.headers["origin"]);
  ctx.set({
    // 'Access-Control-Allow-Headers': 'Content-Type',
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8000',
    // 'Access-Control-Allow-Methods': 'PUT',
    // 'Access-Control-Max-Age': 3600 // 仅在第一次发送options预检请求，之后1小时内不需要预检请求
    // 'Access-Control-Allow-Origin': ctx.headers['origin']
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*"
  });
  await next();
}
module.exports = allowCORS;
