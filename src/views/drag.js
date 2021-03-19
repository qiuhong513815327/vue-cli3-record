// 画布内容拖拽的构造函数
export default class Drag {
  constructor(params = {}) {
    const { width, height, positionX, positionY, color, canvas, img } = params;
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.color = color;
    this.canvas = canvas;
    this.img = img;
    this.step = 1;
    this.oldStep = 1;
    this.rectX = 0;
    this.rectY = 0;
  }
  init() {
    this.drawing();
    this.initEvent();
  }
  drawing() {
    let ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(
      this.img,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
  // 获取画布内的鼠标坐标
  windowClient(x, y) {
    let canvasMess = this.canvas.getBoundingClientRect();
    return { x: x - canvasMess.x, y: y - canvasMess.y };
  }
  // 判断是否在图片区域
  isRect(e) {
    let canvasClient = this.windowClient(e.clientX, e.clientY);
    let hasRectX =
      canvasClient.x > this.positionX &&
      canvasClient.x < this.positionX + this.width;
    let hasRectY =
      canvasClient.y > this.positionY &&
      canvasClient.y < this.positionY + this.height;

    return hasRectX && hasRectY;
  }
  mousedown(e) {
    let flag = this.isRect(e);
    if (flag) {
      // 暂存鼠标按下时在画布内的坐标
      let downClient = this.windowClient(e.clientX, e.clientY);
      // 暂存鼠标最后的位置
      let lastX = downClient.x;
      let lastY = downClient.y;
      this.canvas.onmousemove = (e) => {
        let canvasClient = this.windowClient(e.clientX, e.clientY);
        // 每次拖拽将矩形内坐标作为偏移量保持鼠标点在图片上的位置
        this.positionX += canvasClient.x - lastX;
        this.positionY += canvasClient.y - lastY;
        // this.positionX < 0 && (this.positionX = 0);
        // this.positionX > this.canvas.width - this.width &&
        //   (this.positionX = this.canvas.width - this.width);
        // this.positionY < 0 && (this.positionY = 0);
        // this.positionY > this.canvas.height - this.height &&
        //   (this.positionY = this.canvas.height - this.height);
        requestAnimationFrame(this.drawing.bind(this));
        lastX = canvasClient.x;
        lastY = canvasClient.y;
        this.canvas.onmouseleave = (e) => {
          this.mouseup(e);
        };
      };
    }
  }
  mousemove(e) {
    let flag = this.isRect(e);
    if (flag) {
      this.canvas.style.cursor = "move";
    } else {
      this.canvas.style.cursor = "default";
    }
  }
  mouseup() {
    this.canvas.onmousemove = null;
    this.canvas.onmousemove = (e) => {
      this.mousemove(e);
    };
  }
  handle(e) {
    let key = this.step / this.oldStep;
    this.width *= key;
    this.height *= key;
    let canvasClient = this.windowClient(e.clientX, e.clientY);
    // 矩形内的坐标
    this.rectX = canvasClient.x - this.positionX;
    this.rectY = canvasClient.y - this.positionY;
    this.positionX -= this.rectX * key - this.rectX;
    this.positionY -= this.rectY * key - this.rectY;
    this.drawing();
  }
  // 鼠标滚轮事件执行函数
  wheel(event) {
    if (!this.isRect(event)) return;
    this.oldStep = this.step;
    let delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
      //IE、chrome浏览器使用的是wheelDelta，并且值为“正负150”
      delta = event.wheelDelta / 300;
      // if (delta < 0) {
      //   delta = Math.abs(delta);
      // }
      this.step += delta;
    } else if (event.detail) {
      //FF浏览器使用的是detail,其值为“正负3”
      //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      delta = -event.detail / 6;
    }
    this.step = Math.max(0.5, this.step);
    this.step > 6 && (this.step = 6);
    this.handle(event);
  }

  // 给画布注册事件
  initEvent() {
    this.canvas.onmousemove = (e) => {
      this.mousemove(e);
    };
    this.canvas.onmousedown = (e) => {
      this.mousedown(e);
    };
    this.canvas.onmouseup = (e) => {
      this.mouseup(e);
    };
    // 全局注册鼠标滚轮事件
    if (window.addEventListener) {
      /** DOMMouseScroll is for mozilla. */
      window.addEventListener("DOMMouseScroll", this.wheel.bind(this), false);
    }
    /** IE/Opera/Chrome */
    window.onmousewheel = document.onmousewheel = this.wheel.bind(this);
  }
}
