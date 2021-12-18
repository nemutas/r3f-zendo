import { proxy } from 'valtio';
import { InitialValue } from './static';

export const state = proxy({
	shadowColor: InitialValue.shadowColor,
	amplitude: InitialValue.amplitude,
	frequency: InitialValue.frequency
})

export const effectState = proxy({
	enabled: InitialValue.bloomEnabled
})
