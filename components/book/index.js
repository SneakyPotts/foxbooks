import Image from 'next/image';

import css from './book.module.css';

const Book = ({ book }) => {
const secondExample = {
  size: 50,
  count: 10,
  color: "black",
  activeColor: "red",
  value: 7.5,
  a11y: true,
  isHalf: true,
  emptyIcon: <i className="far fa-star" />,
  halfIcon: <i className="fa fa-star-half-alt" />,
  filledIcon: <i className="fa fa-star" />,
  onChange: newValue => {
    console.log(`Example 2: new value is ${newValue}`);
  }
};
    return <div className={css.wrapper}>
        <Image
            src={book.img}
            alt=""
            width="180"
            height="271"
            placeholder="blur"
            blurDataURL="/images/blur.jpg"
        />
        <div className={css.bookRating}><span>{book.rating}</span></div>
        <h3 className={css.bookName}>{book.name}</h3>
        <p className={css.bookAuthor}>{book.author}</p>
        <span className={css.bookCategorie}>{ book.categorie}</span>
    </div>
}
export default Book