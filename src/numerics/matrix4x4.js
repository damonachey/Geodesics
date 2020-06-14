// this code ported from C# System.Numerics.Matrix4x4
import { Vector3 } from "./vector3";

export const Matrix4x4 = {
  createLookAt(v1, v2, up) {
    const vector = Vector3.normalize(Vector3.subtract(v1, v2));
    const vector2 = Vector3.normalize(Vector3.cross(up, vector));
    const vector3 = Vector3.cross(vector, vector2);
    return {
      M11: vector2.x,
      M12: vector3.x,
      M13: vector.x,
      M14: 0,
      M21: vector2.y,
      M22: vector3.y,
      M23: vector.y,
      M24: 0,
      M31: vector2.z,
      M32: vector3.z,
      M33: vector.z,
      M34: 0,
      M41: 0 - Vector3.dot(vector2, v1),
      M42: 0 - Vector3.dot(vector3, v1),
      M43: 0 - Vector3.dot(vector, v1),
      M44: 1
    };
  }
};
