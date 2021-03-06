/// <reference lib="dom" />
import { InputNode } from "../core/InputNode.d.ts";

export class PropertyNode extends InputNode {
  constructor(object: object, property: string, type: string);

  object: object;
  property: string;
  nodeType: string;
  value: any;
}
