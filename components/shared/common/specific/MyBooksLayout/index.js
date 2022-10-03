import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import Image from 'next/image'
import Book from '../../../icons/navMenu/book';
import Selections from '../../../icons/navMenu/selections';
import Headphones from "../../../icons/headphones";
import Breadcrumbs from "../../../../BreadCrumps/BreadCrumps";
import ArrowRight from "../../../../../public/chevron-right.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/core';

import classNames from "classnames";
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setHeaderVisibility} from "../../../../../store/commonSlice";
import Quote from "../../../icons/quote";
import Smile from "../../../icons/smile";
import Authors from "../../../icons/authors";
import CommonService from "../../../../../http/CommonService";

const MyBooksLayout = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [counters, setCounters] = useState(null)

  const tabs = useMemo(() => [
    {
      title: 'Книги',
      icon: <Book />,
      path: '/mybooks',
      count: counters?.books_count || 0
    },
    {
      title: 'Аудиокниги',
      icon: <Headphones />,
      path: '/mybooks/audio',
      count: counters?.audio_books_count || 0
    },
    {
      title: 'Подборки',
      icon: <Selections />,
      path: '/mybooks/selections',
      count: counters?.compilations_count || 0
    },
    {
      title: 'Рецензии',
      icon: <Smile />,
      path: '/mybooks/reviews',
      count: counters?.total_reviews_count || 0
    },
    {
      title: 'Цитаты',
      icon: <Quote />,
      path: '/mybooks/quotes?sortBy=1',
      count: counters?.quotes_count || 0
    },
    {
      title: 'Авторы',
      icon: <Authors />,
      path: '/mybooks/authors',
      count: counters?.authors_count || 0
    }
  ], [counters])

  const tabIndex = tabs.findIndex(i => router.pathname.includes(i?.path))

  const { innerWidthWindow, headerIsVisible } = useSelector(state => state.common)
  const { userReadingProgress } = useSelector(state => state.book)

  const handleLinkClick = () => {
    if(innerWidthWindow <= 768) {
      dispatch(setHeaderVisibility(false))
    }
  }

  useEffect(() => {
    (async () => {
      const response = await CommonService.getMyListCounters()
      setCounters(response.data?.data)
    })()
  }, [])

  return <>
    {(innerWidthWindow > 768 || headerIsVisible) && <>
      <div className="container">
        <Breadcrumbs
          data={[
            {
              title: 'Мои книги',
              path: '/mybooks'
            },
            {
              title: tabIndex === -1 ? tabs[0].title : tabs[tabIndex]?.title,
              path: tabIndex === -1 ? tabs[0].path : tabs[tabIndex]?.path
            }
          ]}
        />

        <h1 className={classNames('title', styles.title)}>Мои книги</h1>

        {userReadingProgress?.length ?
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.prevArrow',
              nextEl: '.nextArrow',
            }}
            spaceBetween={innerWidthWindow > 768 ? 24 : 10}
            slidesPerView={'auto'}
          >
            {userReadingProgress.map(i => (
              <SwiperSlide
                key={i?.id}
                className={classNames(
                  styles.slide,
                  {
                    [styles.audioSlide]: i?.type === 'audioBooks',
                  }
                )}
              >
                <Link href={i?.type === 'books' ? `/reader?id=${i?.book_id}&page=${i?.page_number}` : `/book/${i?.book_id}?type=audioBooks`}>
                  <a className={styles.slideLink}>
                    <span className={styles.slideProgress}>
                      {i?.progress}%
                    </span>

                    <Image
                      src={i?.cover_url || '/reviewsBookCovers/cover2.png'}
                      width={i?.type === 'audioBooks' ? 195 : 129}
                      height={195}
                      layout={"responsive"}
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
                <Link href={i?.path} scroll={false}>
                  <a
                    className={classNames(
                      styles.navLink,
                      {[styles.active]: router.pathname === i?.path.split('?')[0]}
                    )}
                    onClick={handleLinkClick}
                  >
                    <span className={styles.navLinkCount}>{i?.count}</span>
                    <span className={styles.navWrapper}>
                    <span className={styles.navIcon}>{i?.icon}</span>
                      {i?.title}
                  </span>
                  </a>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </>}

    {(innerWidthWindow > 768 || !headerIsVisible) &&
      <div className="container">
        {children}
      </div>
    }
  </>
};

export default MyBooksLayout;
