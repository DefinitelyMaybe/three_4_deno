// deno-fmt-ignore-file
/// <reference lib="dom" />
export default /* glsl */`
#ifdef USE_FOG

	fogDepth = - mvPosition.z;

#endif
`;
