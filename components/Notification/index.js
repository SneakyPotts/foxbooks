import React, {useEffect, useState} from 'react';
import s from './styles.module.scss';
import {FiBell} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import NotificationItem from "../NotificationItem";
import {setNewNotification} from "../../store/profileSlice";
import classNames from "classnames";

const Notification = ({ callback }) => {
  const dispatch = useDispatch()

  const { innerWidthWindow } = useSelector(state => state.common)
  const { notifications, newNotification } = useSelector(state => state.profile)

  const [dropdownIsVisible, setDropdownIsVisible] = useState(false)

  const showDropdown = () => {
    dispatch(setNewNotification(false))
    setDropdownIsVisible(true)
    if(innerWidthWindow <= 768 && callback) callback()
  }

  const hideDropdown = () => {
    setDropdownIsVisible(false)
  }

  const toggleDropdown = () => {
    dropdownIsVisible ?
      hideDropdown() :
      showDropdown()
  }

  useEffect(() => {
    document.body.addEventListener('click', hideDropdown)

    return () => {
      document.body.removeEventListener('click', hideDropdown)
    }
  }, [])

  return (
    <div
      className={s.wrapper}
      onClick={ev => ev.stopPropagation()}
    >
      <span
        className={s.iconWrapper}
        onClick={toggleDropdown}
      >
        <FiBell/>
        {newNotification &&
          <span className={s.iconIndicator}/>
        }
      </span>

      {dropdownIsVisible &&
        <div className={s.dropdown}>
          {notifications?.length ?
            notifications.map(i =>
              <NotificationItem
                key={i?.createdAt}
                data={i}
              />
            ) :
            <p className={classNames("empty", s.empty)}>Уведомлений нет</p>
          }
        </div>
      }
    </div>
  );
};

export default Notification;