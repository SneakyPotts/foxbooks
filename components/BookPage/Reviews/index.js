import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReviewForm from '../../ReviewForm';
import CommentComp from '../CommentItem';

import st from './reviews.module.scss';

import { clearReviews, getCurrentReviews } from '../../../store/reviewSlice';

import Button from '../../shared/common/Button/Button';
import MyPagination from '../../shared/common/MyPagination';

const Reviews = ({ type }) => {
  const dispatch = useDispatch();
  const blockRef = useRef();

  const { innerWidthWindow } = useSelector((state) => state.common);
  const { id } = useSelector((state) => state.book?.book);
  const { reviews } = useSelector((state) => state.review);
  const { reviewsMobile } = useSelector((state) => state.review);
  const { lastPage } = useSelector((state) => state.review);

  const [reviewTyping, setReviewTyping] = useState(false);
  const [page, setPage] = useState(1);

  const reviewsType = {
    1: 'positive',
    2: 'neutral',
    3: 'negative',
  };

  const requestType = {
    books: 'book',
    audioBooks: 'audio_book',
  };

  const reviewRequestData = {
    type: requestType[type],
    id: id,
    page,
  };

  useEffect(() => {
    dispatch(getCurrentReviews(reviewRequestData));
  }, [page]);

  useEffect(() => {
    dispatch(clearReviews());
    dispatch(getCurrentReviews(reviewRequestData));
  }, [id]);

  const handleLeaveReviewInput = () => {
    setReviewTyping(true);
  };

  return (
    <div
      ref={blockRef}
      id="reviews"
    >
      <h2 className={st.reviewTitle}>Рецензии</h2>

      {!reviewTyping && (
        <Button
          typeButton="button"
          text="Написать рецензию"
          classNames={st.submitButton}
          click={handleLeaveReviewInput}
        />
      )}

      {reviewTyping && (
        <div style={{ paddingRight: '20px' }}>
          <ReviewForm
            bookType={type}
            onCancel={() => setReviewTyping(false)}
            onClose={() => setReviewTyping(false)}
          />
        </div>
      )}

      {(innerWidthWindow > 768 ? reviews : reviewsMobile).map((it, idx) => (
        <div
          key={it.id}
          className={st.review}
        >
          <CommentComp
            idx={idx}
            data={it}
            type={reviewsType[it.review_type_id]}
            reviews={true}
          />
        </div>
      ))}

      {lastPage > 1 ? (
        innerWidthWindow > 768 ? (
          <MyPagination
            currentPage={page}
            onClick={setPage}
            lastPage={lastPage}
            scrollTo={blockRef}
          />
        ) : lastPage > page ? (
          <div
            className={st.pagination}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Показать еще
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default Reviews;
