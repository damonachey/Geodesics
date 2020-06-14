import { Shape } from "./shape";

export const Mobius = {
  create(x, y, z, size) {
    const shape = Shape.create(x, y, z, size);
    shape.name = "Mobius";

    const points = [];
    const ties = [];
    const faces = [];
    const π = Math.PI;
    const r = 1;
    const w = 0.5;

    for (let t = 0; t < 2 * π; t += π / 18) {
      const tie = [];

      for (let s = -w; s <= w; s += (2 * w) / 6) {
        const p = {
          x: (r + s * Math.cos(t / 2)) * Math.cos(t),
          y: (r + s * Math.cos(t / 2)) * Math.sin(t),
          z: s * Math.sin(t / 2)
        };

        points.push(p);
        tie.push(p);
      }

      ties.push(tie);

      if (ties.length >= 2) {
        for (let i = 0; i < ties[ties.length - 1].length - 1; i++) {
          const face = [
            ties[ties.length - 2][i],
            ties[ties.length - 2][i + 1],
            ties[ties.length - 1][i + 1],
            ties[ties.length - 1][i]
          ];

          faces.push(face);
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
