import { Elastic, gsap, Linear } from 'gsap';
import * as THREE from 'three';

/**
 * color tween animation
 * @param uniform e.g. material.uniforms.u_color
 * @param targetColor css color
 */
export const tweenColor = (uniform: THREE.IUniform<any>, targetColor: string) => {
	const color = new THREE.Color(targetColor)
	gsap.to(uniform.value, { r: color.r, g: color.g, b: color.b, ease: Linear.easeOut, duration: 1 })
}

/**
 * amplitude tween animation
 * @param uniform e.g. material.uniforms.u_amplitude
 * @param target value
 */
export const tweenAmplitude = (uniform: THREE.IUniform<any>, target: number) => {
	gsap.to(uniform, { value: target, ease: Elastic.easeOut, duration: 1 })
}

/**
 * frequency tween animation
 * @param uniform e.g. material.uniforms.u_frequency
 * @param target value
 */
export const tweenFrequency = (uniform: THREE.IUniform<any>, target: number) => {
	gsap.to(uniform, { value: target, ease: Elastic.easeOut, duration: 1 })
}
