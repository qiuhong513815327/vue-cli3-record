<template>
  <div class="watch-data-wrap">
    <h1>连接sql</h1>
    <el-button type="primary" size="small" @click="getData">查询</el-button>
    <el-button type="primary" size="small" @click="addData">新增</el-button>
    <el-button type="primary" size="small" @click="deleteData">删除</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "nodeConnectSql",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    async getData() {
      let res = await axios.get("/getSqlData");
      console.log(res.data);
    },
    async addData() {
      let params = {
        name: "测试name",
        url: "测试url",
        alexa: 11
      };
      let res = await axios.post("/addSqlData", params);
      console.log(res);
    },
    async deleteData() {
      let params = {
        name: "测试name"
      };
      let res = await axios.post("/deleteSqlData", params);
      console.log(res);
    }
  }
};
</script>

<style lang="less">
.watch-data-wrap {
  .vux-wrap {
    margin: 0 auto;
    height: 200px;
    width: 300px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
