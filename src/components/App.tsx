import React, { VFC } from 'react';
import { css } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BloomButton } from './button/BloomButton';
import { LinkButtons } from './button/LinkButtons';
import { Zendo } from './viewer/Zendo';

export const App: VFC = () => {
	const theme = React.useMemo(() => createTheme({ palette: { mode: 'dark' } }), [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div css={styles.container}>
				{/* canvas */}
				<Zendo />
				{/* button */}
				<div css={styles.bloomButton}>
					<BloomButton />
				</div>
				<div css={styles.linkButtons}>
					<LinkButtons />
				</div>
				{/* title */}
				<div css={styles.titleConteiner}>
					<div css={styles.title}>蠕動 - Zendo -</div>
				</div>
			</div>
		</ThemeProvider>
	)
}

const styles = {
	container: css`
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	`,
	bloomButton: css`
		position: absolute;
		top: 20px;
		right: 20px;
	`,
	linkButtons: css`
		position: absolute;
		bottom: 20px;
		right: 20px;
	`,
	titleConteiner: css`
		position: absolute;
		top: 5px;
		left: 20px;
	`,
	title: css`
		font-size: clamp(1rem, 10vw, 3rem);
		font-family: 'Yuji Mai', sans-serif;
		user-select: none;
	`
}
