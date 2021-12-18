import React, { VFC } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { SiQiita } from 'react-icons/si';
import { css } from '@emotion/react';
import { IconButton } from '@mui/material';

export const LinkButtons: VFC = () => {
	return (
		<div css={styles.container}>
			<a href="https://github.com/nemutas" target="_blank" rel="noopener noreferrer">
				<IconButton size="large">
					<AiFillGithub color="#fff" />
				</IconButton>
			</a>
			<a href="https://qiita.com/nemutas" target="_blank" rel="noopener noreferrer">
				<IconButton size="large">
					<SiQiita color="#55C500" />
				</IconButton>
			</a>
		</div>
	)
}

const styles = {
	container: css`
		display: grid;
		grid-template-rows: auto auto;
		grid-row-gap: 10px;
	`
}
