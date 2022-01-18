import React from 'react';
import styles from './styles.module.scss'

const Loader = () => {
	return (
		<div className={styles.ldsRipple}>
			<div></div>
			<div></div>
		</div>
	);
};

export default Loader;
