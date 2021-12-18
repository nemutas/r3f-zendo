import React, { useRef, VFC } from 'react';
import { EffectComposer, RenderPass, ShaderPass, UnrealBloomPass } from 'three-stdlib';
import { useSnapshot } from 'valtio';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { effectState } from '../../libs/store';

extend({ EffectComposer, RenderPass, ShaderPass, UnrealBloomPass })

export const Effects: VFC = () => {
	const snap = useSnapshot(effectState)

	const composerRef = useRef<EffectComposer>(null)
	const { gl, scene, camera } = useThree()
	gl.toneMappingExposure = Math.pow(0.9, 4.0)

	useFrame(() => {
		composerRef.current!.render()
	}, 1)

	return (
		<effectComposer ref={composerRef} args={[gl]}>
			<renderPass attachArray="passes" args={[scene, camera]} />
			<unrealBloomPass attachArray="passes" enabled={snap.enabled} strength={3} radius={1.2} threshold={0} />
		</effectComposer>
	)
}
