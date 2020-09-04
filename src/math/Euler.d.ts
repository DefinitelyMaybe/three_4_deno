import { Matrix4 } from "./Matrix4.d.ts";
import { Quaternion } from "./Quaternion.d.ts";
import { Vector3 } from "./Vector3.d.ts";

export class Euler {
  constructor(x?: number, y?: number, z?: number, order?: string);

  /**
	 * @default 0
	 */
  x: number;

  /**
	 * @default 0
	 */
  y: number;

  /**
	 * @default 0
	 */
  z: number;

  /**
	 * @default THREE.Euler.DefaultOrder
	 */
  order: string;
  readonly isEuler: true;

  _onChangeCallback: Function;

  set(x: number, y: number, z: number, order?: string): Euler;
  clone(): this;
  copy(euler: Euler): this;
  setFromRotationMatrix(m: Matrix4, order?: string): Euler;
  setFromQuaternion(q: Quaternion, order?: string): Euler;
  setFromVector3(v: Vector3, order?: string): Euler;
  reorder(newOrder: string): Euler;
  equals(euler: Euler): boolean;
  fromArray(xyzo: any[]): Euler;
  toArray(array?: number[], offset?: number): number[];
  toVector3(optionalResult?: Vector3): Vector3;
  _onChange(callback: Function): this;

  static RotationOrders: string[];
  static DefaultOrder: string;
}
