/// <reference lib="dom" />
import { Color } from "./../math/Color.d.ts";
import { Light } from "./Light.d.ts";
import { PointLightShadow } from "./PointLightShadow.d.ts";

/**
 * @example
 * const light = new THREE.PointLight( 0xff0000, 1, 100 );
 * light.position.set( 50, 50, 50 );
 * scene.add( light );
 */
export class PointLight extends Light {
  constructor(
    color?: Color | string | number,
    intensity?: number,
    distance?: number,
    decay?: number,
  );

  /**
	 * @default 'PointLight'
	 */
  type: string;

  /**
	 * Light's intensity.
	 * @default 1
	 */
  intensity: number;

  /**
	 * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
	 * @default 0
	 */
  distance: number;

  /**
	 * @default 1
	 */
  decay: number;

  /**
	 * @default new THREE.PointLightShadow()
	 */
  shadow: PointLightShadow;

  power: number;
}
