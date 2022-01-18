import React from 'react';
import Pagination from 'rc-pagination';
import Button from "../Button/Button";
import locale from "./locale";
import ArrowRight from './../../../../public/chevron-right.svg';

import styles from './styles.module.scss'
import classNames from "classnames";

const MyPagination = ({currentPage, lastPage, externalClass}) => {
	return (
		<Pagination
			className={classNames(styles.pagination, externalClass)}
			showQuickJumper={{ goButton: <Button classNames={styles.btn} text="Перейти" /> }}
			// current={currentPage}
			defaultPageSize={1}
			total={1500}
			locale={locale}
			prevIcon={<ArrowRight />}
			nextIcon={<ArrowRight />}
		/>
	);
};

export default MyPagination;
