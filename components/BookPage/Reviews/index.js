import { useState } from 'react';
import {useSelector} from 'react-redux';
import Button from '../../shared/common/Button/Button';
import CommentComp from '../CommentItem';
import st from './reviews.module.scss';
import MyPagination from '../../shared/common/MyPagination';
import ReviewForm from "../../ReviewForm";

const Reviews = ({type}) => {
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

      {reviewsAmount.map((it, idx) => (
        <div key={it.id} className={st.review}>
          <CommentComp idx={idx} type={it.type} reviews={true} />
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
