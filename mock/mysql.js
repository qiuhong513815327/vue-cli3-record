const mysql = require("mysql");
// 数据库配置
const config = {
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "websites"
};
let connection = null;
/**
 * 创建连接池并连接
 */
const openConnection = function() {
  connection = mysql.createConnection(config);
  connection.connect(err => {
    if (err) {
      console.log("连接失败", err);
    }
    console.log("连接成功");
  });
};

/**
 * 释放连接池
 */
const closeConnection = function() {
  connection.end(function(err) {
    if (err) {
      console.log("释放连接失败", err);
    }
  });
};
openConnection();

/**
 * 执行连接
 * @param sql
 */

const exec = function(sql) {
  return new Promise((resolve, rejact) => {
    connection.query(sql, function(err, res) {
      if (err) {
        console.log(err);
        rejact(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = {
  exec
};
