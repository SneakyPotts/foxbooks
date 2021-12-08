import Image from 'next/image';
import css from './book.module.css';

const Book = ({book}) => {
    return <>
        <Image
            src={book.img}
            alt=""
            width="180"
            height="271"
            placeholder="blur"
            blurDataURL="/images/blur.jpg"
        />
        <p className={css.bookRating}>{book.rating}</p>
        <h3 className={css.bookName}>{book.name}</h3>
        <p className={css.bookAuthor}>{book.author}</p>
    </>
}
export default Book