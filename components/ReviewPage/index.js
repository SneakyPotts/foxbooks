import ReviewComponent from '../ReviewComponen';
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
      <h2 className={st.title}>
        Рецензии на книги автора «Джоан Кэтлин Роулинг»
      </h2>
      <p className={st.amount}>2199 рецензий</p>
      <div className={st.wrapper}>
        <ul className={st.reviewsList}>
          {reviews.map((it, idx) => (
            <ReviewComponent it={it} idx={idx} />
          ))}
        </ul>
        <div className={st.advertisingBlok}>
          <img src="/banner.png" alt="" className={st.banner} />
          <img src="/banner.png" alt="" className={st.banner} />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
