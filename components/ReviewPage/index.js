import Image from 'next/image';
import Stars from '../shared/common/stars/Stars';
import st from './review.module.scss';

const ReviewPage = () => {
  const reviews = [
    {
      id: '0',
      img: '/horizontalBookCovers/book.png',
      raiting: '5',
    },
    {
      id: '0',
      img: '/horizontalBookCovers/book.png',
      raiting: '5',
    },
    {
      id: '0',
      img: '/horizontalBookCovers/book.png',
      raiting: '5',
    },
    {
      id: '0',
      img: '/horizontalBookCovers/book.png',
      raiting: '5',
    },
    {
      id: '0',
      img: '/horizontalBookCovers/book.png',
      raiting: '5',
    },
    {
      id: '0',
      img: '/horizontalBookCovers/book.png',
      raiting: '5',
    },
    {
      id: '0',
      img: '/horizontalBookCovers/book.png',
      raiting: '5',
    },
  ];
  return (
    <div className="container">
      <h1 className={st.title}>
        Рецензии на книги автора «Джоан Кэтлин Роулинг»
      </h1>
      <p className={st.amount}>2199 рецензий</p>
      <ul className={st.reviewsList}>
        {reviews.map(it => (
          <li key={it.id} className={st.review}>
            <div className={st.reviewBook}>
              <Image src={it.img} width={129} height={195} />
              <div className={st.reviewBookRaiting}>
                <Stars value={it.raiting} />
                <span>{it.raiting}</span>
              </div>
              <h4 className={st.reviewBookName}>Случайная вакансия</h4>
              <p className={st.ReviewBookAuthor}>Джоан Роулинг</p>
            </div>
            <div className={st.reviewContent}>
              <div className={st.reviewHead}>
                <div className={st.reviewer}>
                  <div className={st.reviewerImg}>
                    <Image
                      src="/horizontalBookCovers/bookCover1.png"
                      width={35}
                      height={35}
                      alt=""
                    />
                  </div>
                  <h3 className={st.reviewerName}>Ник</h3>
                </div>
                <p className={st.reviewDate}>20 октября 2021 в 14:05</p>
                <div className={st.reviewBookRaiting}>
                  <span>Оценил книгу</span> <Stars />
                </div>
              </div>
              <h3>Гарри получает похвалы за то, что нарушает запреты</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewPage;
