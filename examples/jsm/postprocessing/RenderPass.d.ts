/// <reference lib="dom" />
import { Camera, Color, Material, Scene } from "../../../src/Three.d.ts";

import { Pass } from "./Pass.d.ts";

export class RenderPass extends Pass {
  constructor(
    scene: Scene,
    camera: Camera,
    overrideMaterial?: Material,
    clearColor?: Color,
    clearAlpha?: number,
  );
  scene: Scene;
  camera: Camera;
  overrideMaterial: Material;
  clearColor: Color;
  clearAlpha: number;
  clearDepth: boolean;
}
