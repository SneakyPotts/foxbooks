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
  externalClass,
  scrollTo,
  smoothScroll = true
}) => {
  const router = useRouter();

  const scrollStartBlock = () => {
    scrollTo && window.scrollTo({
      top: scrollTo.current.offsetTop - 10,
      left: 0,
      behavior: smoothScroll ? "smooth" : "auto",
    });
  }

  const handleChange = current => {
    if (onClick) {
      onClick(current);
    } else {
      router.push({query: {...router.query, page: current}});
    }
    scrollStartBlock();
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
