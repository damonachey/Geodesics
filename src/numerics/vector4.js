// this code ported from C# System.Numerics.Vector4

export const Vector4 = {
  zero: { x: 0, y: 0, z: 0, w: 0 },
  one: { x: 1, y: 1, z: 1, w: 1 },
  unitw: { x: 0, y: 0, z: 0, w: 1 },
  unitX: { x: 1, y: 0, z: 0, w: 0 },
  unitY: { x: 0, y: 1, z: 0, w: 0 },
  unitZ: { x: 0, y: 0, z: 1, w: 0 },

  dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
  },

  length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z + v.w * v.w);
  },

  normalize(v) {
    const len = this.length(v);
    const len2 = 1 / len;

    return { x: v.x * len2, y: v.y * len2, z: v.z * len2, w: v.w * len2 };
  },

  transform(p, q) {
    const num = q.x + q.x;
    const num2 = q.y + q.y;
    const num3 = q.z + q.z;
    const num5 = q.w * num2;
    const num4 = q.w * num;
    const num6 = q.w * num3;
    const num7 = q.x * num;
    const num8 = q.x * num2;
    const num9 = q.x * num3;
    const num10 = q.y * num2;
    const num11 = q.y * num3;
    const num12 = q.z * num3;
    return {
      x: p.x * (1 - num10 - num12) + p.y * (num8 - num6) + p.z * (num9 + num5),
      y: p.x * (num8 + num6) + p.y * (1 - num7 - num12) + p.z * (num11 - num4),
      z: p.x * (num9 - num5) + p.y * (num11 + num4) + p.z * (1 - num7 - num10),
      w: p.w
    };
  }
};
