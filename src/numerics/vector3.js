// this code ported from C# System.Numerics.Vector3

export const Vector3 = {
  zero: { x: 0, y: 0, z: 0 },
  one: { x: 1, y: 1, z: 1 },
  unitX: { x: 1, y: 0, z: 0 },
  unitY: { x: 0, y: 1, z: 0 },
  unitZ: { x: 0, y: 0, z: 1 },

  cross(v1, v2) {
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x
    };
  },

  dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  },

  length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  },

  normalize(v) {
    const len = this.length(v);
    const len2 = 1 / len;

    return { x: v.x * len2, y: v.y * len2, z: v.z * len2 };
  },

  distance(v1, v2) {
    const num = v1.x - v2.x;
    const num2 = v1.y - v2.y;
    const num3 = v1.z - v2.z;
    const x2 = num * num + num2 * num2 + num3 * num3;
    return Math.sqrt(x2);
  },

  subtract(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z };
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
      z: p.x * (num9 - num5) + p.y * (num11 + num4) + p.z * (1 - num7 - num10)
    };
  },

  transformMatrix(p, m) {
    return {
      x: p.x * m.M11 + p.y * m.M21 + p.z * m.M31 + m.M41,
      y: p.x * m.M12 + p.y * m.M22 + p.z * m.M32 + m.M42,
      z: p.x * m.M13 + p.y * m.M23 + p.z * m.M33 + m.M43
    };
  }
};
