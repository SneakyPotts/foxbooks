import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import DrawerPopup from "../shared/common/DrawerPopup";
import Header from './Header'
import TextWithQoutes from './TextWithQoutes'
import ContentPopup from "./ContentPopup";
import QuotesPopup from "./QuotesPopup";
import EditPopup from "./EditPopup";

import classNames from 'classnames'
import styles from './styles.module.scss'
import MyPagination from "../shared/common/MyPagination";

const ReaderBookCopy = () => {
	const { innerWidthWindow } = useSelector(state => state.common)
	const { settings } = useSelector(state => state.reader)

	const [contentPopupIsVisible, setContentPopupIsVisible] = useState(false)
	const [quotesPopupIsVisible, setQuotesPopupIsVisible] = useState(false)
	const [editPopupIsVisible, setEditPopupIsVisible] = useState(false)

	const showContentPopup = () => {
		setContentPopupIsVisible(true)
	}

	const showQuotesPopup = () => {
		setQuotesPopupIsVisible(true)
	}

	const toggleEditPopup = ev => {
		ev.stopPropagation()
		setEditPopupIsVisible(!editPopupIsVisible)
	}

	useEffect(() => {
		return () => {
			console.log('settings', settings)
		}
	}, [])

	return (
		<div
			className={classNames(styles.pageWrapper, styles[`brightness${settings?.screenBrightness}`])}
			onClick={() => setEditPopupIsVisible(false)}
		>
			<div className={classNames('container', styles.pageContainer)}>
				<Header
					showContentPopup={showContentPopup}
					showQuotesPopup={showQuotesPopup}
					toggleEditPopup={toggleEditPopup}
				/>

				<TextWithQoutes />

				<MyPagination
					externalClass={styles.pagination}
					lastPage={500}
				/>

				<div>progress</div>

				{/* Попап с главами */}
				{innerWidthWindow > 768 ?
					contentPopupIsVisible &&
						<ModalWindow
							externalClass={styles.popup}
							onClose={() => setContentPopupIsVisible(false)}
						>
							<ContentPopup />
						</ModalWindow> :
					contentPopupIsVisible &&
						<DrawerPopup
							onClose={() => setContentPopupIsVisible(false)}
						>
							<ContentPopup />
						</DrawerPopup>
				}

				{/* Попап с цитатами */}
				{innerWidthWindow > 768 ?
					quotesPopupIsVisible &&
						<ModalWindow
							externalClass={styles.popup}
							onClose={() => setQuotesPopupIsVisible(false)}
						>
							<QuotesPopup />
						</ModalWindow> :
					quotesPopupIsVisible &&
						<DrawerPopup
							onClose={() => setQuotesPopupIsVisible(false)}
						>
							<QuotesPopup />
						</DrawerPopup>
				}

				{/* Дропдаун с редактированием */}
				{editPopupIsVisible &&
					<DrawerPopup
						externalClass={styles.editPopup}
						onClose={() => setEditPopupIsVisible(false)}
					>
						<EditPopup />
					</DrawerPopup>
				}
			</div>
		</div>
	)
}

export default ReaderBookCopy;