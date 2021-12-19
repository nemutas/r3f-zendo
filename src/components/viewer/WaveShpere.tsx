import { color } from 'csx';
import React, { useMemo, VFC } from 'react';
import * as THREE from 'three';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { tweenAmplitude, tweenColor, tweenFrequency } from '../../libs/animation';
import { InitialValue } from '../../libs/static';
import { state } from '../../libs/store';
import { FakeShadow } from './FakeShadow';

export const WaveShpere: VFC = () => {
	const material = useMemo(() => {
		const mat = new THREE.ShaderMaterial({
			uniforms: {
				// wave
				u_time: { value: 0 },
				u_amplitude: { value: InitialValue.amplitude },
				u_frequency: { value: InitialValue.frequency },
				// glow
				u_color: { value: new THREE.Color(InitialValue.color) },
				u_start: { value: 0 },
				u_end: { value: 1 },
				u_alpha: { value: 1 }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			wireframe: false
		})
		mat.transparent = true
		return mat
	}, [])

	const handleClick = () => {
		const targetColor = `hsl(${Math.random() * 360}, 70%, 65%)`
		tweenColor(material.uniforms.u_color, targetColor)

		const amplitude = Math.random()
		tweenAmplitude(material.uniforms.u_amplitude, amplitude)

		const frequency = Math.random() * (10 - 1) + 1
		tweenFrequency(material.uniforms.u_frequency, frequency)

		// set global state
		state.shadowColor = color(targetColor).lighten(0.2).toHexString()
		state.amplitude = amplitude
		state.frequency = frequency
	}

	const handlePointerEnter = () => {
		document.body.style.cursor = 'pointer'
	}

	const handlePointerLeave = () => {
		document.body.style.cursor = 'auto'
	}

	useFrame(({ clock }) => {
		material.uniforms.u_time.value = clock.getElapsedTime()
	})

	return (
		<>
			<Sphere
				args={[0.8, 128, 128]}
				material={material}
				onClick={handleClick}
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}
			/>
			<FakeShadow position={[0, -1.5, 0]} />
		</>
	)
}

// ==============================================
// Shader

const vertexShader = `
uniform float u_time;
uniform float u_amplitude;
uniform float u_frequency;

varying vec3 v_position;
varying vec3 v_normal;

void main() {
  // wave
  //----------------------------------
  // f1 = sin(t + x * f) -> -1 ~ 1
  // f2 = (f1 + 1) / 2   -> 0 ~ 1
  // f3 = a * f2         -> 0 ~ a
  // f4 = f3 + (1 - a)   -> (1 - a) ~ 1
  //----------------------------------
  float ratio = u_amplitude * (sin(u_time + position.y * u_frequency) + 1.0) / 2.0 + (1.0 - u_amplitude);
  vec4 pos = vec4(vec3(position.x * ratio, position.y, position.z * ratio), 1.0);
    
  // glow
  pos = modelViewMatrix * pos;
  v_position = pos.xyz;
  v_normal = normalMatrix * normal;

  gl_Position = projectionMatrix * pos;
}
`

const fragmentShader = `
uniform vec3 u_color;
uniform float u_start;
uniform float u_end;
uniform float u_alpha;

varying vec3 v_position;
varying vec3 v_normal;

void main() {
  // glow
  vec3 normal = normalize(v_normal);
  vec3 eye = normalize(-v_position);
  float rim = smoothstep(u_start, u_end, 1.0 - dot(normal, eye));
  float ratio = clamp(rim, 0.0, 1.0);
  
  gl_FragColor = vec4(u_color * ratio, u_alpha + ratio);
}
`
