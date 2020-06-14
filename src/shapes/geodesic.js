import { Shape } from "./shape";
import { Vector3 } from "../numerics/vector3";
import { Quaternion } from "../numerics/quaternion";

export const Geodesic = {
  create(x, y, z, size) {
    const shape = Shape.create(x, y, z, size);
    shape.name = "Sphere";

    const bots = [];

    const π = 3.1415927; //Math.PI;
    const epsilon = 0.01;

    {
      const count = 5;
      const r = 1;
      const sr = 0.999;
      const x = sr;
      const y = Math.sqrt(r * r - x * x);
      const z = 0;
      const p = { x, y, z };

      for (let i = 0; i < count; i++) {
        const Θ = (i * 2 * π) / count;
        const q = Quaternion.createFromAxisAngle(Vector3.unitY, Θ);

        bots.push([Vector3.transform(p, q)]);
      }

      let distance = 0;
      let last = Vector3.one;

      while (Math.abs(last.x) > epsilon || Math.abs(last.z) > epsilon) {
        for (let i = 0; i < bots.length; i++) {
          const i2 = (i + 1) % bots.length;
          const a = bots[i][bots[i].length - 1];
          const b = bots[i2][bots[i2].length - 1];
          const n = Vector3.normalize(Vector3.cross(a, b));
          const Θ = (2 * π) / 1000;
          const q = Quaternion.createFromAxisAngle(n, Θ);
          const p = Vector3.transform(a, q);

          if (i === 0) distance += Vector3.distance(a, p);

          last = p;
          bots[i].push(p);
        }
      }

      console.log(bots[0].length, last);
      console.log([
        bots[0][bots[0].length - 1],
        bots[1][bots[1].length - 1],
        bots[2][bots[2].length - 1]
      ]);
      console.log(distance, distance * bots.length);
    }

    shape.transform = function(q) {
      for (const bot of bots) {
        shape.transformPoints(bot, q);
      }
    };

    shape.draw = function() {
      for (const bot of bots) {
        Shape.ctx.strokeStyle = "#fff";
        Shape.ctx.beginPath();
        shape.lines(bot);
        Shape.ctx.stroke();
      }
    };

    return shape;
  }
};
