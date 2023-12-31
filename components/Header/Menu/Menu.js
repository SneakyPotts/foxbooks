import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

import css from './menu.module.scss';

import AvatarWithLetter from '../../shared/common/AvatarWithLetter';
import Headphones from '../../shared/icons/headphones';
import LogoMobileActive from '../../shared/icons/logoMobileActive';
import LogoMobileWhite from '../../shared/icons/logoMobileWhite';
import Book from '../../shared/icons/navMenu/book';
import Fire from '../../shared/icons/navMenu/fire';
import Grid from '../../shared/icons/navMenu/grid';
import MyBooks from '../../shared/icons/navMenu/myBooks';
import Selections from '../../shared/icons/navMenu/selections';
import User from '../../shared/icons/user';

const Navigation = ({ setModal, bottomOnly }) => {
  const router = useRouter();

  const { isAuth } = useSelector((state) => state.auth);
  const { innerWidthWindow } = useSelector((state) => state.common);
  const { profile, newNotification } = useSelector((state) => state.profile);

  return (
    <nav className={css.navigation}>
      <div className={classNames(css.topMenu, { [css.hidden]: bottomOnly })}>
        <Link
          href={{
            pathname: '/[books_type]',
            query: { books_type: 'books' },
          }}
        >
          <a className={`${css.link} ${router.query.books_type === 'books' && !router.query.category_slug ? css.active : css.link}`}>
            <span className={css.icon}>
              <Book />
            </span>
            Книги
          </a>
        </Link>
        <Link
          href={{
            pathname: '/[books_type]',
            query: { books_type: 'audiobooks' },
          }}
        >
          <a className={`${css.link} ${css.linkStroke} ${router.query.books_type === 'audiobooks' && !router.query.category_slug ? css.activeStroke : css.link}`}>
            <span className={css.icon}>
              <Headphones />
            </span>

            <span>Аудиокниги</span>
          </a>
        </Link>
        <Link href="/selections">
          <a className={`${css.link} ${css.linkStroke} ${router.pathname === '/selections' ? css.activeStroke : css.link}`}>
            <span className={css.icon}>
              <Selections />
            </span>
            Подборки
          </a>
        </Link>
        <Link href={`/new`}>
          <a className={`${css.link} ${router.pathname === '/new' ? css.active : css.link} ${innerWidthWindow <= 768 && css.noSpace}`}>
            <span className={css.icon}>
              <Fire />
            </span>
            Новинки
          </a>
        </Link>
      </div>

      <div className={css.dovnMenu}>
        <Link href="/">
          <a className={`${css.dovnMenuLogo} ${router.pathname !== '/' ? css.dovnMenuLogo : css.active}`}>
            {router.pathname === '/' ? <LogoMobileActive /> : <LogoMobileWhite />}
            <span className={css.dovnMenuLogoText}>Главная</span>
          </a>
        </Link>
        <Link href="/categories">
          <a className={`${css.link} ${css.linkStroke} ${css.noSpace} ${router.pathname === '/categories' ? css.activeStroke : css.link}`}>
            <span className={css.icon}>
              <Grid />
            </span>
            Категории
          </a>
        </Link>

        <Link href="/mybooks">
          <a
            onClick={(e) => {
              if (!isAuth) {
                e.preventDefault();
                setModal();
              }
            }}
            className={`${css.link} ${css.linkStroke} ${css.noSpace} ${router.pathname.includes('/mybooks') ? css.activeStroke : css.link}`}
          >
            <span className={css.icon}>
              <MyBooks />
            </span>
            Мои книги
          </a>
        </Link>

        <Link href="/settings">
          <a
            onClick={(e) => {
              if (!isAuth) {
                e.preventDefault();
                setModal();
              }
            }}
            className={`${css.link} ${css.linkStroke} ${css.noSpace} ${css.mobileOnly} ${router.pathname.includes('/settings') ? css.activeStroke : css.link}`}
          >
            <span
              className={classNames(css.icon, {
                [css.rounded]: isAuth,
              })}
            >
              {isAuth ? (
                profile?.avatar ? (
                  <Image
                    src={profile?.avatar}
                    alt="Avatar"
                    width="24"
                    height="24"
                    // placeholder="blur" // рекомендуют убрать для изображений менее 40х40, для повышения производительности
                    blurDataURL="/blur.webp"
                  />
                ) : (
                  <AvatarWithLetter
                    letter={profile?.nickname?.slice(0, 1) || profile?.name?.slice(0, 1) || 'П'}
                    width={24}
                    id={profile?.id}
                    isProfile
                  />
                )
              ) : (
                <User />
              )}
            </span>
            Профиль
            {isAuth && newNotification && <span className={css.indicator} />}
          </a>
        </Link>
      </div>
    </nav>
  );
};
export default Navigation;
