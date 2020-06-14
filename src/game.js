export const Game = {
  showFPS: true,
  showPlayPause: true,
  running: true,

  initialize(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
  },

  run(update, draw) {
    Game.update = update;
    Game.draw = () => {
      draw();
      if (Game.showFPS) drawFPS();
      if (Game.showPlayPause) drawPlayPause();
    };

    this.canvas.onclick = e => handleClick(e);

    window.requestAnimationFrame(loop);
  }
};

let lastRender = 0;

function loop(timestamp) {
  if (!Game.running) return;
  if (!lastRender) lastRender = timestamp;

  const progress = timestamp - lastRender;

  Game.update(progress);
  Game.draw();

  lastRender = timestamp;

  window.requestAnimationFrame(loop);
}

const fpsTimes = [];

function drawFPS() {
  const now = performance.now();

  while (fpsTimes.length > 0 && fpsTimes[0] < now - 1000) fpsTimes.shift();

  fpsTimes.push(now);

  Game.ctx.fillStyle = "#fff";
  Game.ctx.fillText(`fps: ${fpsTimes.length}`, Game.canvas.width - 100, 15);
}

function drawPlayPause() {
  const x = 5;
  const y = 5;

  Game.ctx.stokeSTyle = "#fff";
  if (!Game.running) drawPlayButton(x, y);
  else drawPauseButton(x, y);
}

function drawPlayButton(x, y) {
  drawBox(x, y);

  Game.ctx.beginPath();
  Game.ctx.moveTo(x + 7, y + 5);
  Game.ctx.lineTo(x + 14, y + 10);
  Game.ctx.lineTo(x + 7, y + 15);
  Game.ctx.lineTo(x + 7, y + 5);
  Game.ctx.stroke();
}

function drawPauseButton(x, y) {
  drawBox(x, y);

  Game.ctx.beginPath();
  Game.ctx.moveTo(x + 7, y + 5);
  Game.ctx.lineTo(x + 7, y + 15);
  Game.ctx.stroke();
  Game.ctx.beginPath();
  Game.ctx.lineTo(x + 13, y + 5);
  Game.ctx.lineTo(x + 13, y + 15);
  Game.ctx.stroke();
}

function drawBox(x, y) {
  Game.ctx.beginPath();
  Game.ctx.moveTo(x, y);
  Game.ctx.lineTo(x + 20, y);
  Game.ctx.lineTo(x + 20, y + 20);
  Game.ctx.lineTo(x, y + 20);
  Game.ctx.lineTo(x, y);
  Game.ctx.stroke();
}

function handleClick(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x >= 5 && x <= 25 && y >= 5 && y <= 25) {
    if (!Game.running) {
      Game.running = true;
      window.requestAnimationFrame(loop);
    } else {
      Game.running = false;
      Game.draw();
    }
    e.preventDefault();
  }
}
