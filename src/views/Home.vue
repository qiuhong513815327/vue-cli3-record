<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>This is an home page</h1>
    <button @click="getData">getData</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  mounted() {},
  methods: {
    async getData() {
      let res = await axios.get("/check/getCheckInfo");
      console.log("res:::::", res);
    }
  }
};
</script>
