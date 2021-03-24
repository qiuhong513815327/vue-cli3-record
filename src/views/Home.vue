<template>
  <div class="home">
    <h1>This is an home page</h1>
    <el-button size="small" type="primary" round @click="toPage"
      >跳转到监听页面</el-button
    >
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="修改 vuex和storage：">
        <el-input v-model="formInline.val" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
    <div>vuex的值:{{ value }}</div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      formInline: {
        val: ""
      }
    };
  },
  computed: {
    ...mapState(["value"]),
    ...mapState("module1", ["title"])
  },
  mounted() {
    console.log("title::::", this.title);
  },
  methods: {
    ...mapMutations(["editValue"]),
    toPage() {
      let { href } = this.$router.resolve({
        path: "/watchData"
      });
      window.open(href, "_blank");
    },
    onSubmit() {
      this.editValue(this.formInline.val);
      localStorage.clear();
      localStorage.test = this.formInline.val;
      // localStorage.setItem("foo", "bar");
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  /deep/ .el-form {
    margin-top: 20px;
  }
}
</style>
