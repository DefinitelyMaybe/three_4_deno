/// <reference lib="dom" />
import { LineSegments, Object3D } from "../../../src/Three.d.ts";

export class VertexNormalsHelper extends LineSegments {
  constructor(
    object: Object3D,
    size?: number,
    hex?: number,
  );

  object: Object3D;
  size: number;

  update(): void;
}
