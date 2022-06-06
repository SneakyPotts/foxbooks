import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../shared/common/Button/Button';
import CommentComp from '../CommentItem';
import st from './reviews.module.scss';
import MyPagination from '../../shared/common/MyPagination';
import ReviewForm from "../../ReviewForm";
import {getCurrentReviews} from "../../../store/reviewSlice";

const Reviews = ({type}) => {
  const dispatch = useDispatch();

  const [reviewTyping, setReviewTyping] = useState(false);
  const [page, setPage] = useState(1);

  const {innerWidthWindow} = useSelector(state => state.common);
  const {id} = useSelector(state => state.book?.book);
  const {reviews} = useSelector(state => state.review)
  const reviewsList = reviews?.data;

  const reviewsType = {
    '1': 'positive',
    '2': 'neutral',
    '3': 'negative'
  };
  const requestType = {
    'books': 'book',
    'audioBooks': 'audio_book'
  }
  const reviewRequestData = {
    type: requestType[type],
    id: id,
    page
  }

  useEffect(() => {
    dispatch(getCurrentReviews(reviewRequestData))
  }, [page]);


  const handleLeaveReviewInput = () => {
    setReviewTyping(true);
  };

  return (
    <div id="reviews">
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
        <ReviewForm
          bookType={type}
          onCancel={() => setReviewTyping(false)}
        />
      )}

      {reviewsList?.map((it, idx) => (
        <div key={it.id} className={st.review}>
          <CommentComp
            idx={idx}
            data={it}
            type={reviewsType[it.review_type_id]}
            reviews={true}
          />
        </div>
      ))}

      {reviews?.last_page > 1
        ? innerWidthWindow > 768
          ? (<MyPagination
              currentPage={page}
              onClick={setPage}
              lastPage={reviews?.last_page}
            />)
          : (<div className={st.pagination}>Показать еще</div>)
        : null}
    </div>
  );
};

export default Reviews;
