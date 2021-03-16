<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>This is an home page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations } from "vuex";
export default {
  name: "Home",
  mounted() {
    this.editTitle("home测试页面标题");
    this.editKeywords("home测试页面的Keywords");
    this.editDescription("home测试页面的Description");
  },
  methods: {
    ...mapMutations(["editTitle", "editKeywords", "editDescription"])
  }
};
</script>
