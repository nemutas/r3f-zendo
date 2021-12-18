import React, { VFC } from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Effects } from './Effects';
import { WaveShpere } from './WaveShpere';

export const Zendo: VFC = () => {
	return (
		<Canvas
			camera={{
				position: [0, 0, 4],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}>
			{/* canvas color */}
			<color attach="background" args={['#000']} />
			{/* fps */}
			{/* <Stats /> */}
			{/* camera controller */}
			<OrbitControls
				attach="orbitControls"
				target={[0, -0.3, 0]}
				enablePan={false}
				enableZoom={false}
				maxPolarAngle={Math.PI / 2}
				minAzimuthAngle={0}
				maxAzimuthAngle={0}
				addEventListener={undefined}
				hasEventListener={undefined}
				removeEventListener={undefined}
				dispatchEvent={undefined}
			/>
			{/* helper */}
			{/* <axesHelper args={[1]} /> */}
			{/* objects */}
			<WaveShpere />
			{/* effects */}
			<Effects />
		</Canvas>
	)
}
