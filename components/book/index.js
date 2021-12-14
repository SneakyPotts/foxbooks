import { useRouter } from 'next/router';
import classnames from 'classnames';

import Image from 'next/image';
import ReactStars from 'react-rating-stars-component';
import st from './book.module.scss';
import Headphones from '../shared/icons/headphones';

const Book = ({ audio, flagSwitcher }) => {
  const secondExample = {
    size: 15,
    count: 5,
    value: 2.5,
    color: '#D5D5D5',
    activeColor: '#FEC420',
    edit: false,
    // a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    // onChange: (newValue) => {
    //     setRating(newValue);
    // }
  };
  return (
    <div
      className={classnames({
        [st.container]: !flagSwitcher,
        [st.containerColumn]: flagSwitcher,
      })}
    >
      <div className={st.wrapper}>
        <Image
          src="/horizontalBookCovers/book.png"
          alt=""
          width="180"
          height={audio ? '180' : '271'}
          placeholder="blur"
          blurDataURL="/images/blur.jpg"
        />
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
          <div className={st.extraInfo}>
            <p className={st.bookYear}>
              <span>2021</span>
              <span className={st.bookGenre}>Фэнтези</span>
            </p>
            <p className={st.aboutBook}>
              Я — Макеева Кира Александровна. И я окончательно запуталась. Жизнь
              сложилась не так радужно, как Я — Макеева Кира Александровна. И я
              окончательно запуталась. Жизнь сложилась не так радужно, как
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Book;
