import React from 'react'
import Header from './Header'
import TextWithQoutes from './TextWithQoutes'

import classNames from 'classnames'
import styles from './styles.module.scss'

const ReaderBookCopy = () => {
	return (
		<div className={classNames(styles.pageWrapper, styles.brightness0)}>
			<div className={'container'}>
				<Header />
				<TextWithQoutes />
			</div>
		</div>
	)
}

export default ReaderBookCopy;