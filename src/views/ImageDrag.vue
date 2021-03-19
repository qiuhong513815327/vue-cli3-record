<template>
  <div class="image-drag-wrapper">
    <button @click="triggerImg">切换图片</button><br />
    <canvas width="500px" height="500px" id="tutorial"></canvas>
  </div>
</template>

<script>
import Drag from "./drag.js";
export default {
  name: "ImageDrag",
  data() {
    return {
      obj: {
        width: 100,
        height: 100,
        positionX: 50,
        positionY: 150,
        color: "skyblue",
        img: null
      },
      count: 0,
      imgList: ["0.jpg", "1.png", "2.png", "3.png"]
    };
  },
  mounted() {
    this.initImg();
  },
  methods: {
    // 创建图片实例，图片加载完成初始画布
    initImg() {
      let img = new Image();
      img.src = require("../assets/images/" + this.imgList[this.count]);
      this.obj.img = img;
      img.onload = this.initDrag;
    },
    // 初始化画布
    initDrag() {
      this.obj.canvas = document.getElementById("tutorial");
      let drawRect = new Drag(this.obj);
      drawRect.init();
    },
    triggerImg() {
      // 切换图片
      this.count++;
      this.count > 3 && (this.count = 0);
      this.initImg();
    }
  }
};
</script>

<style lang="less">
.image-drag-wrapper {
  #tutorial {
    margin-top: 10px;
    border: 1px solid #ccc;
  }
}
</style>
