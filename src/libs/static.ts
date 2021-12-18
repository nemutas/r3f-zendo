import { color } from 'csx';

export const InitialValue = {
	color: '#ade465',
	amplitude: 0.4,
	frequency: 3,
	shadowColor: color('#ade465').lighten(0.2).toHexString(),
	shadowRadius: 0.5,
	shadowBlur: 0.5,
	bloomEnabled: false
}
