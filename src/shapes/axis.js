import { Shape } from "./shape.js";
import { Vector3 } from "../numerics/vector3.js";

export const Axis = {
  create(x, y, z, size) {
    const shape = Shape.create(x, y, z, size);
    shape.name = "Axis";

    shape.axisX = { ...Vector3.unitX };
    shape.axisY = { ...Vector3.unitY };
    shape.axisZ = { ...Vector3.unitZ };

    shape.transform = function(q) {
      Object.assign(shape.axisX, Vector3.transform(shape.axisX, q));
      Object.assign(shape.axisY, Vector3.transform(shape.axisY, q));
      Object.assign(shape.axisZ, Vector3.transform(shape.axisZ, q));
    };

    shape.draw = function() {
      Shape.ctx.strokeStyle = "#f00";
      Shape.ctx.beginPath();
      shape.line({ x: 0, y: 0 }, shape.axisX);
      Shape.ctx.stroke();

      Shape.ctx.strokeStyle = "#0f0";
      Shape.ctx.beginPath();
      shape.line({ x: 0, y: 0 }, shape.axisY);
      Shape.ctx.stroke();

      Shape.ctx.strokeStyle = "#00f";
      Shape.ctx.beginPath();
      shape.line({ x: 0, y: 0 }, shape.axisZ);
      Shape.ctx.stroke();

      Shape.ctx.fillStyle = "#000";
      shape.fillText(Math.sign(shape.axisX.x) + "x", shape.axisX);
      shape.fillText(Math.sign(shape.axisY.y) + "y", shape.axisY);
      shape.fillText(Math.sign(shape.axisZ.z) + "z", shape.axisZ);
    };

    return shape;
  }
};
