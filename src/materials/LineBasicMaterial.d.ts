/// <reference lib="dom" />
import { Color } from "./../math/Color.d.ts";
import { Material, MaterialParameters } from "./Material.d.ts";

export interface LineBasicMaterialParameters extends MaterialParameters {
  color?: Color | string | number;
  linewidth?: number;
  linecap?: string;
  linejoin?: string;
  morphTargets?: boolean;
}

export class LineBasicMaterial extends Material {
  constructor(parameters?: LineBasicMaterialParameters);

  /**
	 * @default 'LineBasicMaterial'
	 */
  type: string;

  /**
	 * @default 0xffffff
	 */
  color: Color;

  /**
	 * @default 1
	 */
  linewidth: number;

  /**
	 * @default 'round'
	 */
  linecap: string;

  /**
	 * @default 'round'
	 */
  linejoin: string;

  /**
	 * @default false
	 */
  morphTargets: boolean;

  setValues(parameters: LineBasicMaterialParameters): void;
}
