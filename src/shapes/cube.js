import { Shape } from "./shape.js";

export const Cube = {
  create(x, y, z, size) {
    const shape = Shape.create(x, y, z, size);
    shape.name = "cube";

    const points = [
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },

      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 }
    ];
    const faces = [
      [points[0], points[1], points[2], points[3]],
      [points[7], points[6], points[5], points[4]],
      [points[0], points[4], points[5], points[1]],
      [points[3], points[2], points[6], points[7]]
      //[points[0], points[3], points[7], points[4]],
      //[points[1], points[5], points[6], points[2]]
    ];

    shape.transform = function(q) {
      shape.transformPoints(points, q);
    };

    shape.draw = function() {
      shape.drawFaces(faces);
    };

    return shape;
  }
};
