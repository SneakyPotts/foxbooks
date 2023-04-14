import { useRouter } from 'next/router';

import React from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from '../BreadCrumps/BreadCrumps';

import st from './series.module.scss';

import Banners from '../shared/common/Banner/Banners';
import Book from '../shared/common/book';

const SeriesPage = () => {
  const router = useRouter();
  const { series } = useSelector((state) => state.author);

  return (
    <div className="container">
      <Breadcrumbs
        data={[
          {
            title: `Серия “${series?.series || series?.name}”`,
            path: router.asPath,
          },
        ]}
      />

      <h1 className="title">Серия “{series?.series || series?.name}”</h1>
      <p className={st.amount}>{series?.books_count} книг</p>

      <div className={st.wrapper}>
        <div className={st.booksColumn}>
          {series?.books?.map((i) => (
            <Book key={i?.id} book={i} type={i?.type} flagSwitcher={true} />
          ))}
        </div>

        <div className={st.advertisingBlok}>
          <Banners />
        </div>
      </div>
    </div>
  );
};

export default SeriesPage;
