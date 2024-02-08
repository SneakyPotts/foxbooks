import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArrowRight from '../../../../../public/chevron-right.svg';
import Breadcrumbs from '../../../../BreadCrumps/BreadCrumps';
import Authors from '../../../icons/authors';
import Headphones from '../../../icons/headphones';
import Book from '../../../icons/navMenu/book';
import Selections from '../../../icons/navMenu/selections';
import Quote from '../../../icons/quote';
import Smile from '../../../icons/smile';
import Loader from '../../Loader';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { Navigation } from 'swiper/core';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';

import { setHeaderVisibility } from '../../../../../store/commonSlice';

import BookService from '../../../../../http/BookService';
import CommonService from '../../../../../http/CommonService';

const MyBooksLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [counters, setCounters] = useState(null);
  const [counterLoad, setCounterLoad] = useState(true);

  const [userReadingProgress, setUserReadingProgress] = useState([]);
  const [progressLoad, setProgressLoad] = useState(true);

  const tabs = useMemo(
    () => [
      {
        title: 'Книги',
        icon: <Book />,
        path: '/mybooks',
        count: counters?.books_count || 0,
      },
      {
        title: 'Аудиокниги',
        icon: <Headphones />,
        path: '/mybooks/audio',
        count: counters?.audio_books_count || 0,
      },
      {
        title: 'Подборки',
        icon: <Selections />,
        path: '/mybooks/selections',
        count: counters?.compilations_count || 0,
      },
      {
        title: 'Рецензии',
        icon: <Smile />,
        path: '/mybooks/reviews',
        count: counters?.total_reviews_count || 0,
      },
      {
        title: 'Цитаты',
        icon: <Quote />,
        path: '/mybooks/quotes',
        count: counters?.quotes_count || 0,
      },
      {
        title: 'Авторы',
        icon: <Authors />,
        path: '/mybooks/authors',
        count: counters?.authors_count || 0,
      },
    ],
    [counters],
  );

  const tabIndex = tabs.findIndex((i) => router.pathname.includes(i?.path));

  const { innerWidthWindow, headerIsVisible } = useSelector((state) => state.common);

  const handleLinkClick = () => {
    if (innerWidthWindow <= 768) {
      dispatch(setHeaderVisibility(false));
    }
  };

  const fetchData = async (token) => {
    if (!token) return;

    try {
      const [countersResponse, readingProgressResponse] = await Promise.all([CommonService.getMyListCounters(), BookService.getUserReadingProgresses(token)]);

      setCounters(countersResponse?.data?.data);
      setCounterLoad(false);

      setUserReadingProgress(Array.from({ length: 50 }, (_, i) => readingProgressResponse?.data?.data[i]));
      setProgressLoad(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');

    fetchData(token).then();
  }, []);

  return (
    <>
      {(innerWidthWindow > 768 || headerIsVisible) && (
        <>
          <div className="container">
            <Breadcrumbs
              data={[
                {
                  title: 'Мои книги',
                  path: '/mybooks',
                },
                {
                  title: tabIndex === -1 ? tabs[0].title : tabs[tabIndex]?.title,
                  path: tabIndex === -1 ? tabs[0].path : tabs[tabIndex]?.path,
                },
              ]}
            />

            <h1 className={classNames('title', styles.title)}>Мои книги</h1>

            {progressLoad ? (
              <div className={styles.progressPlace}>
                <Loader />
              </div>
            ) : userReadingProgress?.length ? (
              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: '.prevArrow',
                  nextEl: '.nextArrow',
                }}
                spaceBetween={innerWidthWindow > 768 ? 24 : 10}
                slidesPerView={'auto'}
              >
                {userReadingProgress.map((i, j) => (
                  <SwiperSlide
                    key={`${i?.book_id}_${i.id}-${j}`}
                    className={classNames(styles.slide, {
                      [styles.audioSlide]: i?.type === 'audioBooks',
                    })}
                  >
                    <Link href={i?.type === 'books' ? `/reader?id=${i?.book_id}&page=${i?.page_number}` : `/audiobooks/${i?.genre?.slug}/${i?.slug}`}>
                      <a className={styles.slideLink}>
                        <span className={styles.slideProgress}>{i?.progress}%</span>

                        <Image
                          src={i?.cover_url || '/reviewsBookCovers/cover2.png'}
                          alt={`book cover image`}
                          width={i?.type === 'audioBooks' ? 195 : 129}
                          height={195}
                          layout={'responsive'}
                          placeholder="blur"
                          blurDataURL="/blur.webp"
                          priority={j < 9}
                          className={styles.navItemImg}
                        />

                        {i?.type === 'audioBooks' && (
                          <span className={styles.slideIcon}>
                            <Headphones />
                          </span>
                        )}
                      </a>
                    </Link>
                  </SwiperSlide>
                ))}

                <button className={classNames('prevArrow', styles.sliderBtn)}>
                  <ArrowRight className="arrowNext" />
                </button>
                <button className={classNames('nextArrow', styles.sliderBtn)}>
                  <ArrowRight className="arrowNext" />
                </button>
              </Swiper>
            ) : (
              <p className="empty">У вас нет добавленных книг</p>
            )}
          </div>

          <nav className={styles.nav}>
            {counterLoad ? (
              <div className={styles.counterPlace}>
                <Loader />
              </div>
            ) : (
              <ul className={styles.navList}>
                {tabs.map((i) => (
                  <li
                    key={i?.title}
                    className={styles.navItem}
                  >
                    <Link
                      href={i?.path}
                      scroll={false}
                    >
                      <a
                        className={classNames(styles.navLink, { [styles.active]: router.pathname === i?.path.split('?')[0] })}
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
                ))}
              </ul>
            )}
          </nav>
        </>
      )}

      {(innerWidthWindow > 768 || !headerIsVisible) && <div className="container">{children}</div>}
    </>
  );
};

export default MyBooksLayout;
