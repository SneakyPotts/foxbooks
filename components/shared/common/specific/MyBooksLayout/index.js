import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import Image from 'next/image'
import Headphones from "../../../icons/headphones";
import Breadcrumbs from "../../../../BreadCrumps/BreadCrumps";
import ArrowRight from "../../../../../public/chevron-right.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/core';

import classNames from "classnames";
import styles from './styles.module.scss'

const tabs = [
  {
    title: 'Книги',
    path: '/mybooks',
    count: 1
  },
  {
    title: 'Аудиокниги',
    path: '/mybooks/audio',
    count: 3
  },
  {
    title: 'Подборки',
    path: '/mybooks/selections',
    count: 6
  },
  {
    title: 'Рецензии',
    path: '/mybooks/reviews',
    count: 2
  },
  {
    title: 'Цитаты',
    path: '/mybooks/quotes',
    count: 5
  },
  {
    title: 'Авторы',
    path: '/mybooks/authors',
    count: 2
  }
]

const MyBooksLayout = ({ children }) => {
  const router = useRouter()
  const tabIndex = tabs.findIndex(i => router.pathname === i?.path)

  const dataBooks = [
    {
      id: '0',
      img: '/reviewsBookCovers/cover2.png',
      type: 'books',
      progress: '23',
    },
    {
      id: '1',
      img: '/reviewsBookCovers/cover2.png',
      type: 'books',
      progress: '10',
    },
    {
      id: '2',
      img: '/reviewsBookCovers/cover2.png',
      type: 'books',
      progress: '23',
    },
    {
      id: '3',
      img: '/reviewsBookCovers/cover2.png',
      type: 'books',
      progress: '13',
    },
    {
      id: '4',
      img: '/reviewsBookCovers/cover2.png',
      type: 'books',
      progress: '23',
    },
    {
      id: '5',
      img: '/reviewsBookCovers/cover2.png',
      type: 'audioBooks',
      progress: '54',
    },
    {
      id: '6',
      img: '/reviewsBookCovers/cover2.png',
      type: 'books',
      progress: '1',
    },
    {
      id: '7',
      img: '/reviewsBookCovers/cover2.png',
      type: 'audioBooks',
      progress: '37',
    },
    {
      id: '8',
      img: '/reviewsBookCovers/cover2.png',
      type: 'books',
      progress: '23',
    },
  ];
  
  return <>
    <div className="container">
      <Breadcrumbs
        data={[
          {
            title: 'Мои книги',
            path: '/mybooks'
          },
          {
            title: tabs[tabIndex]?.title,
            path: tabs[tabIndex]?.path
          }
        ]}
      />

      <h1 className={styles.title}>Мои книги</h1>

      {dataBooks?.length ?
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.prevArrow',
            nextEl: '.nextArrow',
          }}
          spaceBetween={24}
          slidesPerView={'auto'}
        >
          {dataBooks.map(i => (
            <SwiperSlide
              key={i?.id}
              className={classNames(
                styles.slide,
                {
                  [styles.audioSlide]: i?.type === 'audioBooks',
                }
              )}
            >
              <Link href="/reader">
                <a className={styles.slideLink}>
                  <span className={styles.slideProgress}>
                    {i?.progress}%
                  </span>

                  <Image
                    src={i?.img}
                    width={i?.type === 'audioBooks' ? 195 : 129}
                    height={195}
                    className={styles.navItemImg}
                  />

                  {i?.type === 'audioBooks' &&
                  <span className={styles.slideIcon}>
                      <Headphones/>
                    </span>
                  }
                </a>
              </Link>
            </SwiperSlide>
          ))}

          <button className={classNames('prevArrow', styles.sliderBtn)}>
            <ArrowRight className="arrowNext"/>
          </button>
          <button className={classNames('nextArrow', styles.sliderBtn)}>
            <ArrowRight className="arrowNext"/>
          </button>
        </Swiper> :
        <p className="empty">У вас нет добавленных книг</p>
      }
    </div>

    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {tabs.map(i => (
          <li
            key={i?.title}
            className={styles.navItem}
          >
            <Link href={i?.path}>
              <a className={styles.navLink}>
                <span className={styles.navLinkCount}>{i?.count}</span>
                {i?.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    <div className="container">
      {children}
    </div>
  </>
};

export default MyBooksLayout;