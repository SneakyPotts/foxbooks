import { FiSearch, FiBell } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu/Menu';
import User from '../../public/user.svg';
import Logo from '../Logo';
import GroupForms from './groupForms/GroupForms';
import Setting from '../shared/icons/setting';
import Exit from '../shared/icons/exit';
import { AuthAccount, ShowMenu } from './headerSlice';
import st from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { authFlag, showMenu } = useSelector(state => state.headerSlice);

  const [modal, setModal] = useState(false);
  const [flagSettings, setFlagSettings] = useState(false);

  const onSearchInput = () => {
    dispatch(ShowMenu(true));
  };
  const popularBooks = [
    {
      id: '0',
      img: '/reviewsBookCovers/cover1.png',
      name: 'Пост 2. Спастись и сохранить',
    },
    {
      id: '1',
      img: '/reviewsBookCovers/cover2.png',
      name: 'Девочка в нулевой степени',
    },
    {
      id: '2',
      img: '/reviewsBookCovers/cover3.png',
      name: 'Предружба. Второй шанс',
    },
    {
      id: '3',
      img: '/reviewsBookCovers/cover1.png',
      name: 'Четыре ветра',
    },
    {
      id: '4',
      img: '/reviewsBookCovers/cover2.png',
      name: 'Последний ход',
    },
    {
      id: '5',
      img: '/reviewsBookCovers/cover3.png',
      name: 'Лето в пионерском галстуке',
    },
  ];
  console.log(showMenu);

  return (
    <div className={st.main}>
      <div className={st.container}>
        <header className={st.header}>
          <Logo />
          <div className={st.input}>
            <input
              type="text"
              placeholder="Искать книги, авторов, жанры, издательства"
              className={st.inputCastom}
              onClick={onSearchInput}
            />
            <FiSearch className={st.iconSearch} />
          </div>
          <div className={st.menu}>
            <FiBell className={st.iconBell} />
            {authFlag ? (
              <div
                onClick={() => setFlagSettings(!flagSettings)}
                className={st.avatarUser}
              >
                <div>
                  <Image
                    src="/horizontalBookCovers/book.png"
                    alt=""
                    width="40"
                    height="40"
                    placeholder="blur"
                    blurDataURL="/images/blur.jpg"
                  />
                </div>
                <div
                  className={classNames(st.settingAccount, {
                    [st.settingAccountActive]: flagSettings,
                  })}
                >
                  <ul>
                    <li>
                      <Setting />
                      <Link href="/settings">
                        <a>Настройки профиля</a>
                      </Link>
                    </li>
                    <li onClick={() => dispatch(AuthAccount(false))}>
                      <Exit />
                      <span>Выйти</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div onClick={() => setModal(!modal)} className={st.userMenu}>
                <User className={st.iconUser} />
                Войти
              </div>
            )}
          </div>
        </header>
      </div>
      {showMenu && (
        <div className={classNames('container', st.dropDown)}>
          <h2>Часто ищут</h2>
          <ul className={st.dropDownPopular}>
            {popularBooks.map(it => (
              <li key={it.id} className={st.dropDownPopularItem}>
                <Image
                  src={it.img}
                  width={124}
                  height={187}
                  // layout="fill"
                  placeholder="blur"
                  blurDataURL="/images/blur.jpg"
                />
                <h4>{it.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="container">
        <Menu />
      </div>

      <GroupForms setModal={setModal} modal={modal} />
    </div>
  );
};
export default Header;
