import React, { useEffect, useMemo, VFC } from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { Plane } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { tweenAmplitude, tweenColor, tweenFrequency } from '../../libs/animation';
import { InitialValue } from '../../libs/static';
import { state } from '../../libs/store';

type ShadowPlaneProps = {
	position?: [number, number, number]
	rotation?: [number, number, number]
	color?: THREE.Color
	radius?: number
	blur?: number
	amplitude?: number
	frequency?: number
}

export const FakeShadow: VFC<ShadowPlaneProps> = props => {
	const {
		position = [0, 0, 0],
		rotation = [-Math.PI / 2, 0, 0],
		color,
		radius = InitialValue.shadowRadius,
		blur = InitialValue.shadowBlur,
		amplitude,
		frequency
	} = props

	const snap = useSnapshot(state)

	const planeSize = radius * 2 + blur + 0.5
	const ratio = 1 / planeSize

	const material = useMemo(() => {
		const mat = new THREE.ShaderMaterial({
			uniforms: {
				u_color: { value: new THREE.Color(InitialValue.shadowColor) },
				u_radius: { value: InitialValue.shadowRadius },
				u_smooth: { value: InitialValue.shadowBlur },
				u_time: { value: 0.0 },
				u_amplitude: { value: InitialValue.amplitude },
				u_frequency: { value: InitialValue.frequency }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		})
		mat.transparent = true
		return mat
	}, [])

	useEffect(() => {
		// console.log('init')
		color && (material.uniforms.u_color.value = color)
		material.uniforms.u_radius.value = radius * ratio
		material.uniforms.u_smooth.value = blur * ratio
		amplitude && (material.uniforms.u_amplitude.value = amplitude)
		frequency && (material.uniforms.u_frequency.value = frequency)
	}, [amplitude, blur, color, frequency, material, radius, ratio])

	useEffect(() => {
		// console.log('change')
		tweenColor(material.uniforms.u_color, snap.shadowColor)
		tweenAmplitude(material.uniforms.u_amplitude, snap.amplitude)
		tweenFrequency(material.uniforms.u_frequency, snap.frequency)
	}, [material.uniforms.u_amplitude, material.uniforms.u_color, material.uniforms.u_frequency, snap])

	useFrame(({ clock }) => {
		material.uniforms.u_time.value = clock.getElapsedTime()
	})

	return <Plane args={[planeSize, planeSize]} material={material} position={position} rotation={rotation} />
}

// ==============================================
// Shader

const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
varying vec2 v_uv;
uniform vec3 u_color;
uniform float u_radius;
uniform float u_smooth;

uniform float u_time;
uniform float u_amplitude;
uniform float u_frequency;

void main() {
  float dist = distance(vec2(0.5), v_uv);
  float circle = 1.0 - smoothstep(u_radius - u_smooth, u_radius + u_smooth, dist);
	//----------------------------------------------------------------------------------------------------
	// The top(1.0) and bottom(-1.0) of the sphere have a radius around the y-axis that is close to zero,
	// so the shadow is affected at -0.8 from the center.

	float ratio = u_amplitude * (sin(u_time - 0.8 * u_frequency) + 1.0) / 2.0 + (1.0 - u_amplitude);
	//----------------------------------------------------------------------------------------------------
	
  gl_FragColor = vec4(u_color * circle * ratio, 1.0 * circle * ratio);
}
`
