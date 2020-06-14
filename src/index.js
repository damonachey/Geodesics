import "./styles.css";

import { Game } from "./game";
import { Canvas } from "./canvas";

import { Shape } from "./shapes/shape";
import { Axis } from "./shapes/axis";
import { Cone } from "./shapes/cone";
import { Cube } from "./shapes/cube";
import { Sphere } from "./shapes/sphere";
import { Mobius } from "./shapes/mobius";

import { Utilities } from "./utilities";
import { Geometry } from "./geometry";
import { Quaternion } from "./numerics/quaternion";
import { Matrix4x4 } from "./numerics/matrix4x4";
import { Vector3 } from "./numerics/vector3";

function draw() {
  Canvas.clear("#444");

  for (const shape of shapes) shape.draw();
}

function update(progress) {
  const π = Math.PI;
  const q = Quaternion.createFromYawPitchRoll(π / 400, π / 500, π / 600);

  for (const shape of shapes) shape.transform(q);
}

Game.initialize("canvas");
Canvas.initialize("canvas");
Shape.initialize("canvas");

const shapes = [
  Axis.create((Canvas.canvas.width * 1) / 10, Canvas.canvas.height / 2, 0, 100),
  Cone.create((Canvas.canvas.width * 3) / 10, Canvas.canvas.height / 2, 0, 100),
  Cube.create((Canvas.canvas.width * 5) / 10, Canvas.canvas.height / 2, 0, 100),
  Sphere.create(
    (Canvas.canvas.width * 7) / 10,
    Canvas.canvas.height / 2,
    0,
    125,
    18
  ),
  Mobius.create(
    (Canvas.canvas.width * 9) / 10,
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
