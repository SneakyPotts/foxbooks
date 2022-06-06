import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../shared/common/Button/Button';
import CommentComp from '../CommentItem';
import st from './reviews.module.scss';
import MyPagination from '../../shared/common/MyPagination';
import ReviewForm from "../../ReviewForm";
import {getCurrentReviews} from "../../../store/reviewSlice";

const Reviews = ({type}) => {
  // const reviewsAmount = [
  //   { id: '0', type: 'positive' },
  //   { id: '1', type: 'negative' },
  //   { id: '2', type: 'neutral' },
  // ];

  const dispatch = useDispatch();

  const [reviewTyping, setReviewTyping] = useState(false);

  const {innerWidthWindow} = useSelector(state => state.common);
  const {id} = useSelector(state => state.book?.book);
  const reviewsList = useSelector(state => state.review?.reviews?.data)

  const reviewsType = {
    '1': 'positive',
    '2': 'negative',
    '3': 'neutral'
  };
  const requestType = {
    'books': 'book',
    'audioBooks': 'audio_book'
  }
  const reviewRequestData = {
    type: requestType[type],
    id: id
  }

  useEffect(async () => {
    dispatch(getCurrentReviews(reviewRequestData))
  }, []);


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

      {innerWidthWindow > 768 ? (
        <MyPagination/>
      ) : (
        <div className={st.pagination}>Показать еще</div>
      )}
    </div>
  );
};

export default Reviews;
