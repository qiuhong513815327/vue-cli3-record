<template>
  <div class="image-drag-wrapper">
    <el-button type="success" size="small" @click="triggerImg"
      >切换图片</el-button
    ><br />
    <canvas width="500px" height="500px" id="tutorial"></canvas>
    <div class="rainbow"></div>
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
    window.addEventListener("mousewheel", fn, false);
    window.addEventListener("DOMMousewheel", fn, false);
    function fn(event) {
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        console.log("chrome:::", event.wheelDelta);
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      } else if (event.detail) {
        console.log("FF");
        //FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail / 3;
      }
      if (delta) console.log(delta);
      // handle(delta);
    }
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
    position: absolute;
    top: 100px;
    left: 350px;
    z-index: 10;
  }
  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }
  .rainbow {
    position: absolute;
    top: 94px;
    left: 344px;
    z-index: 1;
    width: 448px;
    height: 448px;
    border-radius: 10px;
    overflow: hidden;
    padding: 2rem;
  }
  .rainbow::before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #399953;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#399953, #399953),
      linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),
      linear-gradient(#377af5, #377af5);
    animation: rotate 4s linear infinite;
  }
  .rainbow::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: white;
    border-radius: 5px;
  }
}
</style>
