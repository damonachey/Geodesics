export const Geometry = {
  distancePointPoint(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dz = p2.z - p1.z || 0;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  areaTriangle(p1, p2, p3) {
    return (
      (p1.x * p2.y +
        p2.x * p3.y +
        p3.x * p1.y -
        p1.x * p3.y -
        p2.x * p1.y -
        p3.x * p2.y) /
      2
    );
  }
};
