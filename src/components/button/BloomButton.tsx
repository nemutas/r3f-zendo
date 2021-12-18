import React, { VFC } from 'react';
import { BsLightbulb, BsLightbulbOff } from 'react-icons/bs';
import { useSnapshot } from 'valtio';
import { IconButton } from '@mui/material';
import { effectState } from '../../libs/store';

export const BloomButton: VFC = () => {
	const snap = useSnapshot(effectState)

	return (
		<IconButton
			size="large"
			onClick={() => {
				effectState.enabled = !snap.enabled
			}}>
			{snap.enabled ? <BsLightbulbOff color="#fff" /> : <BsLightbulb color="#fff" />}
		</IconButton>
	)
}
