import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../shared/common/Button/Button';
import CommentComp from '../CommentComponent';
import st from './reviews.module.scss';
import MyPagination from '../../shared/common/MyPagination';
import {getReviewTypes} from "../../../store/reviewSlice";
import ReviewForm from "../../ReviewForm";

const Reviews = () => {
  const dispatch = useDispatch()
  const reviewsAmount = [
    { id: '0', type: 'positive' },
    { id: '1', type: 'negative' },
    { id: '2', type: 'neutral' },
  ];

  const [reviewTyping, setReviewTyping] = useState(false);

  const { innerWidthWindow } = useSelector(state => state.common);

  const handleLeaveReviewInput = () => {
    setReviewTyping(true);
  };

  const handleChangeReviewField = e => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  useEffect(() => {
    dispatch(getReviewTypes())
  }, []);

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
          onCancel={() => setReviewTyping(false)}
        />
      )}

      {reviewsAmount.map((it, idx) => (
        <div key={it.id} className={st.review}>
          <CommentComp content='Рицензии' idx={idx} type={it.type} reviews={true} />
        </div>
      ))}

      {innerWidthWindow > 768 ? (
        <MyPagination />
      ) : (
        <div className={st.pagination}>Показать еще</div>
      )}
    </div>
  );
};

export default Reviews;
