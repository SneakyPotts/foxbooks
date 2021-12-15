import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import Image from 'next/image';
import ReactStars from 'react-rating-stars-component';
import st from './book.module.scss';
import Headphones from '../shared/icons/headphones';
import AddToBooks from '../shared/icons/add';
import HorizontalDots from '../../public/horizontalDots.svg';
import OpenBook from '../../public/book-open.svg';
import Like from '../shared/icons/heart';
import Comment from '../shared/icons/comment';

import Basket from '../../public/trash.svg';

const Book = ({ audio, flagSwitcher, activeStart = false }) => {
  const secondExample = {
    size: 15,
    count: 5,
    value: 4.5,
    color: '#D5D5D5',
    activeColor: '#FEC420',
    edit: activeStart,
    // a11y: false,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    // onChange: (newValue) => {
    //     setRating(newValue);
    // }
  };
  const [changeIcon, setChangeIcon] = useState(false);
  const [options, setOptions] = useState(false);

  const route = useRouter();
  console.log(route, 'router');

  const onChangeIcon = () => {
    setChangeIcon(true);
  };

  const checkOptions = () => {
    setOptions(!options);
  };

  return (
    <div
      className={classnames({
        [st.container]: !flagSwitcher,
        [st.containerColumn]: flagSwitcher,
      })}
    >
      <div className={st.wrapper}>
        <Link href="/book">
          <a>
            <Image
              src="/horizontalBookCovers/book.png"
              alt=""
              width="180"
              height={audio ? '180' : '271'}
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
            />
          </a>
        </Link>
        <span className={st.bookCategorie}>Фентези</span>
        {audio && (
          <span className={st.audioIcon}>
            <Headphones />
          </span>
        )}
      </div>
      <div className={classnames({ [st.bookInfo]: flagSwitcher })}>
        <div
          className={classnames(st.bookRating, {
            [st.starOrder]: flagSwitcher,
            [st.starOrderList]: flagSwitcher && !audio,
          })}
        >
          <ReactStars {...secondExample} />
          <div>
            <span>4,9 </span>
            <span>(450)</span>
          </div>
        </div>
        <h3 className={st.bookName}>
          Искатели неба: Холодные берега Искатели неба: Холодные берега
        </h3>
        <p className={st.bookAuthor}>Сергей Лукьяненко</p>
        {flagSwitcher && (
          <div className={classnames(st.extraInfo, { [st.addInfo]: !audio })}>
            <p className={st.bookYear}>
              <span>2021</span>
              <span className={st.bookGenre}>Фэнтези</span>
            </p>
            <p className={classnames(st.aboutBook, { [st.lines]: !audio })}>
              Я — Макеева Кира Александровна. И я окончательно запуталась. Жизнь
              сложилась не так радужно, как Я — Макеева Кира Александровна. И я
              окончательно запуталась. Жизнь сложилась не так радужно, как Я —
              Макеева Кира Александровна. И я окончательно запуталась. Жизнь
              сложилась не так радужно, как Я — Макеева Кира Александровна.
            </p>
            {!audio && (
              <div className={st.reviewStatistic}>
                <span className={st.reviewIcon}>
                  <Like />
                </span>
                <span className={st.reviewLike}>3115</span>
                <span className={st.reviewIcon}>
                  <Comment />
                </span>
                <span>700</span>
              </div>
            )}
          </div>
        )}
        {flagSwitcher && (
          <div>
            <span
              className={classnames(st.addIcon, { [st.hide]: changeIcon })}
              onClick={onChangeIcon}
            >
              <AddToBooks />
            </span>
            {changeIcon && (
              <span className={classnames(st.dotsIcon)} onClick={checkOptions}>
                <HorizontalDots />
              </span>
            )}
            {options && (
              <div className={st.optionWindow}>
                <p className={st.optionRead}>
                  <span className={st.optionIcon}>
                    <OpenBook />
                  </span>
                  Читаю
                </p>
                <p className={st.optionDelete}>
                  <span className={st.optionIcon}>
                    <Basket />
                  </span>
                  Удалить из моих книг
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Book;
