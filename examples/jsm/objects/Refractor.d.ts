/// <reference lib="dom" />
import {
  BufferGeometry,
  Color,
  Mesh,
  TextureEncoding,
  WebGLRenderTarget,
} from "../../../src/Three.d.ts";

export interface RefractorOptions {
  color?: Color;
  textureWidth?: number;
  textureHeight?: number;
  clipBias?: number;
  shader?: object;
  encoding?: TextureEncoding;
}

export class Refractor extends Mesh {
  constructor(geometry?: BufferGeometry, options?: RefractorOptions);

  getRenderTarget(): WebGLRenderTarget;
}
