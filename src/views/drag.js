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
      let downClient = this.windowClient(e.clientX, e.clientY);
      let _x = downClient.x - this.positionX;
      let _y = downClient.y - this.positionY;
      this.canvas.onmousemove = (e) => {
        let moveClient = this.windowClient(e.clientX, e.clientY);
        this.positionX = moveClient.x - _x;
        this.positionY = moveClient.y - _y;
        this.positionX < 0 && (this.positionX = 0);
        this.positionX > this.canvas.width - this.width &&
          (this.positionX = this.canvas.width - this.width);
        this.positionY < 0 && (this.positionY = 0);
        this.positionY > this.canvas.height - this.height &&
          (this.positionY = this.canvas.height - this.height);
        // this.drawing();
        requestAnimationFrame(this.drawing.bind(this));
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
  }
}
