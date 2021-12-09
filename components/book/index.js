import Image from 'next/image';
import ReactStars from "react-rating-stars-component";
import css from './book.module.css';


const Book = ({book}) => {

    const secondExample = {
        size: 15,
        count: 5,
        value: 2.5,
        color: "#D5D5D5",
        activeColor: "#FEC420",
        edit: false,
        // a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />
        // onChange: (newValue) => {
        //     setRating(newValue);
        // }
    };
    return (
        <div className={css.wrapper}>
            <Image
                src='/horizontalBookCovers/book.png'
                alt=""
                width="180"
                height="271"
                placeholder="blur"
                blurDataURL="/images/blur.jpg"
            />
            <div className={css.bookRating}>
                <ReactStars {...secondExample} />
                <div>
                    <span>4,9 </span>
                    <span>(450)</span>
                </div>

            </div>
            <h3 className={css.bookName}>Искатели неба: Холодные берега Искатели неба: Холодные берега</h3>
            <p className={css.bookAuthor}>Сергей Лукьяненко</p>
            <span className={css.bookCategorie}>Фентези</span>
        </div>
    )
}
export default Book