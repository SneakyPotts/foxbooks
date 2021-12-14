import { FiSearch, FiBell } from 'react-icons/fi';
import Menu from './Menu/Menu';
import User from '../../public/user.svg';
import Logo from '../Logo';
import css from './header.module.scss';
import { useState } from 'react';
import GroupForms from './groupForms/GroupForms';
import {useDispatch, useSelector} from "react-redux";
import Image from "next/image";
import Setting from "../shared/icons/setting";
import Exit from "../shared/icons/exit";
import classNames from "classnames";

import Link from 'next/link'
import {AuthAccount} from "./headerSlice";


const Header = () => {
  const dispatch = useDispatch()
  const { authFlag } = useSelector(state => state.headerSlice)

  const [modal, setModal] = useState(false);
  const [flagSettings, setFlagSettings] = useState(false);



  return (
    <div className={css.main}>
      <div className={css.container}>
        <header className={css.header}>
          <Logo />
          <div className={css.input}>
            <input
              type="text"
              placeholder="Искать книги, авторов, жанры, издательства"
              className={css.inputCastom}
            />
            <FiSearch className={css.iconSearch} />
          </div>
          <div className={css.menu}>
            <FiBell className={css.iconBell} />
            {authFlag ?
            <div
                onClick={()=>setFlagSettings(!flagSettings)}
                className={css.avatarUser}>
              <div>
                <Image
                    src="/horizontalBookCovers/book.png"
                    alt=""
                    width="40"
                    height='40'
                    placeholder="blur"
                    blurDataURL="/images/blur.jpg"
                />
              </div>
              <div className={classNames(css.settingAccount , {[css.settingAccountActive] : flagSettings})}>
                <ul>
                  <li>
                    <Setting/>
                    <Link href="/settings">
                      <a>Настройки профиля</a>
                    </Link>
                  </li>
                  <li onClick={()=>dispatch(AuthAccount(false))}>
                    <Exit/>
                    <span>Выйти</span>
                  </li>
                </ul>
              </div>
            </div>
                :
                <div onClick={() => setModal(!modal)} className={css.userMenu}>
                  <User className={css.iconUser} />
                  Войти
                </div>
            }
          </div>
        </header>
        <Menu />
      </div>
      <GroupForms setModal={setModal} modal={modal} />
    </div>
  );
};
export default Header;
