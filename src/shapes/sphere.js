import { Shape } from "./shape.js";

export const Sphere = {
  create(x, y, z, size, smoothing = 18) {
    const shape = Shape.create(x, y, z, size);
    shape.name = "Sphere";

    const points = [];
    const lats = [];
    const faces = [];

    const π = Math.PI;
    const epsilon = 0.000001;

    for (let lat = -π / 2; lat <= π / 2 + epsilon; lat += π / smoothing) {
      const parallel = [];

      for (let long = 0; long < 2 * π; long += π / smoothing) {
        const p = {
          x: Math.sin(long) * Math.cos(lat),
          y: Math.sin(lat),
          z: Math.cos(long) * Math.cos(lat)
        };

        points.push(p);
        parallel.push(p);
      }

      lats.push(parallel);

      if (lats.length >= 2) {
        for (let i = 0; i < lats[lats.length - 1].length - 1; i++) {
          const face = [
            lats[lats.length - 2][i],
            lats[lats.length - 2][i + 1],
            lats[lats.length - 1][i + 1],
            lats[lats.length - 1][i]
          ];

          // cut out section
          if (!face.every(p => p.x >= 0 && p.z >= 0)) {
            faces.push(face);
          }
        }
      }
    }

    shape.transform = function(q) {
      shape.transformPoints(points, q);
    };

    shape.draw = function() {
      shape.drawFaces(faces);
    };

    return shape;
  }
};
