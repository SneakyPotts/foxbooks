import React from 'react';
import { useRouter } from 'next/router';
import Pagination from 'rc-pagination';
import Button from '../Button/Button';
import locale from './locale';
import ArrowRight from './../../../../public/chevron-right.svg';

import styles from './styles.module.scss';
import classNames from 'classnames';

const MyPagination = ({
  currentPage,
  lastPage,
  onClick,
  externalClass
}) => {
  const router = useRouter();

  const handleChange = current => {
    onClick
      ? onClick(current)
      : router.push({ query: { ...router.query, page: current } });
  };

  return (
    <Pagination
      className={classNames(styles.pagination, externalClass)}
      showQuickJumper={{
        goButton: <Button classNames={styles.btn} text="Перейти" />,
      }}
			current={+router.query?.page || currentPage || 1}
      defaultPageSize={1}
      total={lastPage}
      locale={locale}
      prevIcon={<ArrowRight />}
      nextIcon={<ArrowRight />}
      onChange={handleChange}
    />
  );
};

export default MyPagination;
