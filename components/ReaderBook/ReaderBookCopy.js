import React from 'react'
import Header from './Header'
import TextWithQoutes from './TextWithQoutes'

import classNames from 'classnames'
import styles from './styles.module.scss'

const ReaderBookCopy = () => {
	return (
		<div className={classNames('container', styles.pageWrapper)}>
			<Header />
			<TextWithQoutes />
		</div>
	)
}

export default ReaderBookCopy;