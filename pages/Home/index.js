import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ArrowRight from '../../public/chevron-right.svg'
import Categories from '../../components/HomePage/Categories/categories';
import Alphabet from '../../components/HomePage/Alphabet/Alphabet';
import ArrowNext from '../../public/arrow-next.svg';
import Hero from '../../components/HomePage/Hero/Hero';
import BookUpdates from '../../components/HomePage/Updates';
import Filters from '../../components/Filter';
import Introductory from '../../components/HomePage/Introductory block';
import About from '../../components/HomePage/About'
import css from './home.module.css';

const data = [
  { id: '0', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' },
  { id: '1', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' },
  { id: '2', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' },
  { id: '3', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' },
  { id: '4', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' },
  { id: '5', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' },
  { id: '6', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' },
  { id: '7', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' },
  { id: '8', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' },
  { id: '9', img: 'http://dummyimage.com/180x271/c0c0c0&text=No+image', rating: 'rating', name: 'book Title', author: 'book Author' }
]

const HomeView = () => {
  return (
    <div className={css.container}>
      <div className={css.mainContainer}>
        <Categories />
        <div className={css.mainBlock}>
          <Alphabet />
          <div className={css.new}>
            <h2 className={css.newTitle}>Новинки книг</h2>
            <Link href="/new">
              <a className={css.newLink}>
                Смотреть все <ArrowRight />
              </a>
            </Link>
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={5}
            // onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className={css.booksList}
          >
            {data.map(({ id, img, rating, name, author }) => <SwiperSlide key={id} className={css.bookItem}>
                <Image
                  src={img}
                  alt=""
                  width="180"
                  height="271"
                  placeholder="blur"
                  blurDataURL="/images/blur.jpg"
                />
                <p className={css.bookRating}>{rating}</p>
                <h3 className={css.bookName}>{name}</h3>
                <p className={css.bookAuthor}>{author}</p>
              </SwiperSlide>)}
          </Swiper>
          <ArrowNext className={css.arrowNext} onSlideChange={() => console.log('slide change')}/>
        </div>
      </div>
      <Hero />
      <div className={css.wrapper}>
        <BookUpdates className={ css.updates}/>
        <Filters />
        {/* <Filtred/> */}
        
      </div>
      <Introductory />
      <About/>
    </div>
  );
};
export default HomeView;
