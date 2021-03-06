/// <reference lib="dom" />
import { Uniform } from "../../../src/Three.d.ts";

export const GammaCorrectionShader: {
  uniforms: {
    tDiffuse: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
};
