import Link from 'next/link';
import { useRouter } from 'next/router';

import React from 'react';

import Button from '../Button/Button';
import ArrowRight from './../../../../public/chevron-right.svg';
import locale from './locale';
import classNames from 'classnames';
import Pagination from 'rc-pagination';

import styles from './styles.module.scss';

const MyPagination = ({ currentPage, lastPage, onClick, externalClass, scrollTo, smoothScroll = true, customLink }) => {
  const router = useRouter();

  const NewLink = ({ current }) => {
    const newLink = customLink.includes('page=')
      ? customLink
          .replace(/\?page=\d+$/, current === 1 ? '' : `?page=${current}`)
          .replace(/\?page=\d+&/, current === 1 ? '?' : `?page=${current}&`)
          .replace(/&page=\d+/, current === 1 ? '' : `&page=${current}`)
      : `${customLink}${current === 1 ? '' : `${customLink.includes('?') ? '&' : '?'}page=${current}`}`;

    return (
      <Link href={newLink}>
        <a>{current}</a>
      </Link>
    );
  };

  const scrollStartBlock = () => {
    scrollTo &&
      window.scrollTo({
        top: scrollTo.current.offsetTop - 10,
        left: 0,
        behavior: smoothScroll ? 'smooth' : 'auto',
      });
  };

  const handleChange = (current) => {
    if (onClick) {
      onClick(current);
    } else {
      const { page, ...query } = router.query;

      router.push({ query: current === 1 ? { ...query } : { ...query, page: current } });
    }

    scrollStartBlock();
  };

  return (
    <Pagination
      className={classNames(styles.pagination, externalClass)}
      showQuickJumper={{
        goButton: (
          <Button
            classNames={styles.btn}
            text="Перейти"
          />
        ),
      }}
      itemRender={(current, type, element) => (type === 'page' && customLink ? <NewLink current={current} /> : element)}
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
