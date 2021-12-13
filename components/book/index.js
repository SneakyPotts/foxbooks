import {useRouter} from 'next/router';

import Image from 'next/image';
import ReactStars from 'react-rating-stars-component';
import css from './book.module.scss';
import Headphones from '../shared/icons/headphones';

const Book = ({audio}) => {
    const secondExample = {
        size: 15,
        count: 5,
        value: 2.5,
        color: '#D5D5D5',
        activeColor: '#FEC420',
        edit: false,
        // a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star"/>,
        halfIcon: <i className="fa fa-star-half-alt"/>,
        filledIcon: <i className="fa fa-star"/>,
        // onChange: (newValue) => {
        //     setRating(newValue);
        // }
    };
    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <Image
                    src="/horizontalBookCovers/book.png"
                    alt=""
                    width="180"
                    height={audio ? '180' : '271'}
                    placeholder="blur"
                    blurDataURL="/images/blur.jpg"
                />
                <span className={css.bookCategorie}>Фентези</span>
                {audio && (
                    <span className={css.audioIcon}>
            <Headphones/>
          </span>
                )}
            </div>
            <div className={css.bookRating}>
                <ReactStars {...secondExample} />
                <div>
                    <span>4,9 </span>
                    <span>(450)</span>
                </div>
            </div>
            <h3 className={css.bookName}>
                Искатели неба: Холодные берега Искатели неба: Холодные берега
            </h3>
            <p className={css.bookAuthor}>Сергей Лукьяненко</p>
        </div>
    );
};
export default Book;
