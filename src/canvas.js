export const Canvas = {
  initialize(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    resize(this.canvas);

    window.addEventListener("resize", resize, false);
  },

  clear(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function resize() {
  Canvas.canvas.width = window.innerWidth;
  Canvas.canvas.height = window.innerHeight;
}
