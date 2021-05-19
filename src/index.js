import { Game } from "./game.js";
import { Canvas } from "./canvas.js";

import { Shape } from "./shapes/shape.js";
import { Axis } from "./shapes/axis.js";
import { Cone } from "./shapes/cone.js";
import { Cube } from "./shapes/cube.js";
import { Sphere } from "./shapes/sphere.js";
import { Mobius } from "./shapes/mobius.js";
import { Geodesic } from "./shapes/geodesic.js";

import { Utilities } from "./utilities.js";
import { Geometry } from "./geometry.js";
import { Quaternion } from "./numerics/quaternion.js";
import { Matrix4x4 } from "./numerics/matrix4x4.js";
import { Vector3 } from "./numerics/vector3.js";

function draw() {
  Canvas.clear("#444");

  for (const shape of shapes) shape.draw();
}

function update(progress) {
  const π = Math.PI;
  const q = Quaternion.createFromYawPitchRoll(π / 4000, π / 5000, π / 6000);

  for (const shape of shapes) shape.transform(q);
}

Game.initialize("canvas");
Canvas.initialize("canvas");
Shape.initialize("canvas");

const shapes = [
  Axis.create((Canvas.canvas.width * 1) / 5, Canvas.canvas.height / 2, 0, 100),
  Geodesic.create(
    (Canvas.canvas.width * 3) / 5,
    Canvas.canvas.height / 2,
    0,
    100
  )
];

Game.run(update, draw);

window.onkeypress = e => {
  if (e.key === "x") {
    Game.running = false;

    const axis = shapes.find(s => s.name === "Axis");

    if (axis) {
      const m = Matrix4x4.createLookAt(
        axis.axisX,
        Vector3.unitX,
        Vector3.unitY
      );

      const q = Quaternion.createFromRotationMatrix(m);

      for (const shape of shapes) {
        shape.transform(q);
      }
    }

    Game.draw();
  }
};

Canvas.canvas.onmousedown = e => startDrag(e);
Canvas.canvas.onmouseup = e => stopDrag(e);
Canvas.canvas.onmousemove = e => onmousemove(e);

let dragging = false;
let prevX = undefined;
let prevY = undefined;

function startDrag(e) {
  //if (Game.running) return;

  dragging = true;
}

function stopDrag(e) {
  //if (Game.running) return;

  dragging = false;
  prevX = undefined;
  prevY = undefined;
}

function onmousemove(e) {
  e.preventDefault();

  if (!dragging) return;

  const rect = Canvas.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (prevX && prevY) {
    const dx = x - prevX;
    const dy = y - prevY;

    const π = Math.PI;
    const q = Quaternion.createFromYawPitchRoll(
      (π * -dx) / 100,
      (π * dy) / 100,
      0
    );

    for (const shape of shapes) shape.transform(q);

    Game.draw();
  }

  prevX = x;
  prevY = y;
}
