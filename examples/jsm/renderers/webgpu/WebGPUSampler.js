// deno-fmt-ignore-file
/// <reference lib="dom" />
import WebGPUBinding from './WebGPUBinding.js';
import { GPUBindingType } from './constants.js';

class WebGPUSampler extends WebGPUBinding {

	constructor( name ) {

		super( name );

		this.type = GPUBindingType.Sampler;
		this.visibility = GPUShaderStage.FRAGMENT;

		this.samplerGPU = null; // set by the renderer

		Object.defineProperty( this, 'isSampler', { value: true } );

	}

}

export default WebGPUSampler;
