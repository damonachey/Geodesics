import { Vector3 } from "../numerics/vector3.js";

export const Shape = {
  id: 0,

  initialize(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
  },

  create(x, y, z, size) {
    return {
      id: this.id++,
      x: x,
      y: y,
      z: z,
      size: size,

      transformPoints(points, q) {
        for (let i = 0; i < points.length; i++) {
          Object.assign(points[i], Vector3.transform(points[i], q));
        }
      },

      toScreen(p) {
        const self = this;

        return {
          x: self.x + p.x * self.size,
          y: -(self.y + p.y * self.size) + Shape.canvas.height
        };
      },

      moveTo(p) {
        p = this.toScreen(p);
        Shape.ctx.moveTo(p.x, p.y);
      },

      lineTo(p) {
        p = this.toScreen(p);
        Shape.ctx.lineTo(p.x, p.y);
      },

      line(p1, p2) {
        this.moveTo(p1);
        this.lineTo(p2);
      },

      lines(points) {
        this.moveTo(points[0]);

        for (var i = 1; i < points.length; i++) {
          this.lineTo(points[i]);
        }
      },

      drawFaces(faces) {
        faces.sort(
          (a, b) =>
            a.map(_ => _.z).reduce((sum, _) => sum + _) / 4 -
            b.map(_ => _.z).reduce((sum, _) => sum + _) / 4
        );

        for (const face of faces) {
          this.drawFace(face);
        }
      },

      // points assumed clockwize order for direction
      drawFace(points) {
        const c1 = Vector3.subtract(points[0], points[1]);
        const c2 = Vector3.subtract(points[1], points[2]);
        const n = Vector3.cross(c1, c2);
        const dz = Vector3.dot(Vector3.unitZ, n);

        const dl = Vector3.dot(
          Vector3.normalize({ x: 1, y: 1, z: 1 }),
          Vector3.normalize(n)
        );

        if (dz > 0) {
          Shape.ctx.fillStyle = `rgba(0, 0, ${(0.5 + 0.5 * dl) * 256})`;
        } else {
          Shape.ctx.fillStyle = `rgba(33, 33, ${dl * 64})`;
        }

        Shape.ctx.strokeStyle = "#fff4";
        Shape.ctx.beginPath();
        this.moveTo(points[0]);
        for (let i = 1; i < points.length; i++) {
          this.lineTo(points[i]);
        }
        Shape.ctx.closePath();
        Shape.ctx.fill();
        Shape.ctx.stroke();
      },

      fillText(t, p) {
        p = this.toScreen(p);
        Shape.ctx.fillText(t, p.x, p.y);
      }
    };
  }
};
