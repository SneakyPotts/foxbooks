import React from 'react';

import classNames from 'classnames';
import styles from './index.module.scss';

const ModalWindow = ({
	children,
	onClose,
	externalClass
}) => {
	return (
		<div
			className={classNames(styles.wrapper)}
			onClick={() => onClose()}
		>
			<div
				className={classNames(styles.wrapperBlock, externalClass)}
				onClick={e => e.stopPropagation()}
			>
				<div
					onClick={() => onClose()}
					className={styles.wrapperBlockCross}
				>
					<span />
					<span />
				</div>

				{children}
			</div>
		</div>
	);
};

export default ModalWindow;
