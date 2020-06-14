// this code ported from C# System.Numerics.Quanternion

export const Quaternion = {
  createFromAxisAngle(axis, angle) {
    const x = angle * 0.5;
    const num = Math.sin(x);
    const w = Math.cos(x);
    return {
      x: axis.x * num,
      y: axis.y * num,
      z: axis.z * num,
      w: w
    };
  },

  createFromRotationMatrix(m) {
    const num = m.M11 + m.M22 + m.M33;
    const result = {};
    if (num > 0) {
      let num2 = Math.sqrt(num + 1);
      result.w = num2 * 0.5;
      num2 = 0.5 / num2;
      result.x = (m.M23 - m.M32) * num2;
      result.y = (m.M31 - m.M13) * num2;
      result.z = (m.M12 - m.M21) * num2;
    } else if (m.M11 >= m.M22 && m.M11 >= m.M33) {
      const num3 = Math.sqrt(1 + m.M11 - m.M22 - m.M33);
      const num4 = 0.5 / num3;
      result.x = 0.5 * num3;
      result.y = (m.M12 + m.M21) * num4;
      result.z = (m.M13 + m.M31) * num4;
      result.w = (m.M23 - m.M32) * num4;
    } else if (m.M22 > m.M33) {
      const num5 = Math.sqrt(1 + m.M22 - m.M11 - m.M33);
      const num6 = 0.5 / num5;
      result.x = (m.M21 + m.M12) * num6;
      result.y = 0.5 * num5;
      result.z = (m.M32 + m.M23) * num6;
      result.w = (m.M31 - m.M13) * num6;
    } else {
      const num7 = Math.sqrt(1 + m.M33 - m.M11 - m.M22);
      const num8 = 0.5 / num7;
      result.x = (m.M31 + m.M13) * num8;
      result.y = (m.M32 + m.M23) * num8;
      result.z = 0.5 * num7;
      result.w = (m.M12 - m.M21) * num8;
    }
    return result;
  },

  createFromYawPitchRoll(yaw, pitch, roll) {
    const x = roll * 0.5;
    const num = Math.sin(x);
    const num2 = Math.cos(x);
    const x2 = pitch * 0.5;
    const num3 = Math.sin(x2);
    const num4 = Math.cos(x2);
    const x3 = yaw * 0.5;
    const num5 = Math.sin(x3);
    const num6 = Math.cos(x3);

    return {
      x: num6 * num3 * num2 + num5 * num4 * num,
      y: num5 * num4 * num2 - num6 * num3 * num,
      z: num6 * num4 * num - num5 * num3 * num2,
      w: num6 * num4 * num2 + num5 * num3 * num
    };
  },

  multiply(q1, q2) {
    const x = q1.x;
    const y = q1.y;
    const z = q1.z;
    const w = q1.w;
    const x2 = q2.x;
    const y2 = q2.y;
    const z2 = q2.z;
    const w2 = q2.w;
    const num = y * z2 - z * y2;
    const num2 = z * x2 - x * z2;
    const num3 = x * y2 - y * x2;
    const num4 = x * x2 + y * y2 + z * z2;
    return {
      X: x * w2 + x2 * w + num,
      Y: y * w2 + y2 * w + num2,
      Z: z * w2 + z2 * w + num3,
      W: w * w2 - num4
    };
  },

  inverse(q) {
    const num = q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w;
    const num2 = 1 / num;
    return {
      x: (0 - q.x) * num2,
      y: (0 - q.y) * num2,
      z: (0 - q.z) * num2,
      w: q.w * num2
    };
  }
};
