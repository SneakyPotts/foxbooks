import React from 'react';

import classNames from 'classnames';
import styles from './index.module.scss';

const ModalWindow = ({
	children,
	onClose,
	click,
	isFullScreen = false,
	externalClass
}) => {
	return (
		<div
			className={classNames(styles.wrapper)}
			onClick={() => onClose()}
		>
			<div
				className={classNames(
					styles.wrapperBlock,
					{[styles.wrapperBlockFullScreen]: isFullScreen},
					externalClass
				)}
				onClick={e => {
					e.stopPropagation()
					// click && click();
				}}
			>
				<div
					onClick={ev => {
						ev.stopPropagation()
						onClose()
					}}
					className={classNames(
						styles.wrapperBlockCross, {
						[styles.wrapperBlockFullScreenCross]: isFullScreen,
					})}
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
