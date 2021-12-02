import Link from 'next/link';
import Image from 'next/image';
import { FiChevronRight } from 'react-icons/fi';
import Categories from '../../components/Categories/categories';
import Alphabet from '../../components/Alphabet/Alphabet';
import ArrowNext from '../../public/arrow-next.svg';
import Hero from '../../components/Hero/Hero';
import BookUpdates from '../../components/Updates/BookUpdates';
import Filters from '../../components/Filter';
import css from './home.module.css';

const HomeView = () => {
  return (
    <div className={css.mainContainer}>
      <div className={css.container}>
        <Categories />
        <div className={css.mainBlock}>
          <Alphabet />
          <div className={css.new}>
            <h2 className={css.newTitle}>Новинки книг</h2>
            <Link href="/new">
              <a className={css.newLink}>
                Смотреть все <FiChevronRight size="24px" />
              </a>
            </Link>
          </div>
          <ul className={css.booksList}>
            <li className={css.bookItem}>
              <Image
                src="http://dummyimage.com/180x271/c0c0c0&text=No+image"
                alt=""
                width="180"
                height="271"
                placeholder="blur"
                blurDataURL="/images/blur.jpg"
              />
              <p className={css.bookRating}>rating</p>
              <h3 className={css.bookName}>name</h3>
              <p className={css.bookAuthor}>author</p>
            </li>
            <li className={css.bookItem}>
              <Image
                src="http://dummyimage.com/180x271/c0c0c0&text=No+image"
                alt=""
                width="180"
                height="271"
              />
              <p className={css.bookRating}>rating</p>
              <h3 className={css.bookName}>name</h3>
              <p className={css.bookAuthor}>author</p>
            </li>
            <li className={css.bookItem}>
              <Image
                src="http://dummyimage.com/180x271/c0c0c0&text=No+image"
                alt=""
                width="180"
                height="271"
              />
              <p className={css.bookRating}>rating</p>
              <h3 className={css.bookName}>name</h3>
              <p className={css.bookAuthor}>author</p>
            </li>
            <li className={css.bookItem}>
              <Image
                src="http://dummyimage.com/180x271/c0c0c0&text=No+image"
                alt=""
                width="180"
                height="271"
              />
              <p className={css.bookRating}>rating</p>
              <h3 className={css.bookName}>name</h3>
              <p className={css.bookAuthor}>author</p>
            </li>
            <li className={css.bookItem}>
              <Image
                src="http://dummyimage.com/180x271/c0c0c0&text=No+image"
                alt=""
                width="180"
                height="271"
              />
              <p className={css.bookRating}>rating</p>
              <h3 className={css.bookName}>name</h3>
              <p className={css.bookAuthor}>author</p>
            </li>
          </ul>
          <ArrowNext className={css.arrowNext} />
        </div>
      </div>
      <Hero />
      <div className={css.filters}>
        <BookUpdates />
        <Filters />
        {/* <Filtred/> */}
      </div>
    </div>
  );
};
export default HomeView;
