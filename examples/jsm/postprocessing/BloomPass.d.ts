/// <reference lib="dom" />
import { ShaderMaterial, WebGLRenderTarget } from "../../../src/Three.d.ts";

import { Pass } from "./Pass.d.ts";

export class BloomPass extends Pass {
  constructor(
    strength?: number,
    kernelSize?: number,
    sigma?: number,
    resolution?: number,
  );
  renderTargetX: WebGLRenderTarget;
  renderTargetY: WebGLRenderTarget;
  copyUniforms: object;
  materialCopy: ShaderMaterial;
  convolutionUniforms: object;
  materialConvolution: ShaderMaterial;
  fsQuad: object;
}
