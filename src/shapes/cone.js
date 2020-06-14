import { Shape } from "./shape";
import { Vector3 } from "../numerics/vector3";

export const Cone = {
  create(x, y, z, size, smoothing = 18) {
    const shape = Shape.create(x, y, z, size);
    shape.name = "Cone";

    const π = Math.PI;
    const epsilon = 0.000001;

    const apex = { x: 0, y: 1, z: 0 };
    const points = [];
    const faces = [];

    for (
      let angle = 0;
      angle <= 2 * π + epsilon;
      angle += (2 * π) / smoothing
    ) {
      const p = {
        x: Math.sin(angle),
        y: -0.5,
        z: Math.cos(angle)
      };

      points.push(p);

      if (points.length >= 2) {
        const face = [
          points[points.length - 2],
          points[points.length - 1],
          apex
        ];

        // cut out section
        if (!face.every(p => p.x >= 0 && p.z >= 0)) {
          faces.push(face);
        }
      }
    }

    shape.transform = function(q) {
      Object.assign(apex, Vector3.transform(apex, q));

      shape.transformPoints(points, q);
    };

    shape.draw = function() {
      shape.drawFaces(faces);
    };

    return shape;
  }
};
