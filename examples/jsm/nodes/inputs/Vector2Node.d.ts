/// <reference lib="dom" />
import { Vector2 } from "../../../../src/Three.d.ts";

import { InputNode } from "../core/InputNode.d.ts";
import { NodeBuilder } from "../core/NodeBuilder.d.ts";

export class Vector2Node extends InputNode {
  constructor(x: Vector2 | number, y?: number);

  value: Vector2;
  nodeType: string;

  generateReadonly(
    builder: NodeBuilder,
    output: string,
    uuid?: string,
    type?: string,
    ns?: string,
    needsUpdate?: boolean,
  ): string;
  copy(source: Vector2Node): this;
}
