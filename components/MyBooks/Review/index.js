import { useState } from 'react';
import Image from 'next/image';
import dataReview from '../../data/reviews.json';
import Like from '../../shared/icons/heart';
import Eye from '../../shared/icons/eye';
import Comment from '../../shared/icons/comment';
import EditPensil from '../../shared/icons/editPencil';
import Bin from '../../../public/trash.svg';
import HorizontalDots from '../../../public/horizontalDots.svg';

import st from './review.module.scss';

const Review = () => {
  const [menu, setMenu] = useState(false);

  const checkOptions = () => {
    setMenu(!menu);
  };
  return (
    <div className={st.reviews}>
      {dataReview.map(review => (
        <div>
          <div className={st.reviewsCover}>
            <Image src={review.img} alt="" width="86" height="143" />
            <div className={st.bookMainInfo}>
              <h3 className={st.bookTitle}>{review.book_title}</h3>
              <p className={st.bookAuthor}>{review.book_author}</p>
            </div>
          </div>
          <div className={st.reviewInfo}>
            <p className={st.reviewData}>{review.review_data}</p>
            <div className={st.reviewViews}>
              <span className={st.sumReviews}>{review.sum_reviews}</span>
              <Eye />
            </div>
          </div>
          <p className={st.reviewTitle}>{review.review_title}</p>
          <p className={st.reviewText}>{review.review_text}</p>
          <div className={st.reviewBottom}>
            <div className={st.reviewBottomStatistic}>
              <span className={st.reviewIcon}>
                <Like />
              </span>
              <span className={st.reviewLike}>{review.likes}</span>
              <span className={st.reviewIcon}>
                <Comment />
              </span>
              <span>{review.comments}</span>
            </div>
            <span className={st.dotsIcon} onClick={checkOptions}>
              <HorizontalDots />
            </span>
            {menu && (
              <div className={st.editMenu}>
                <p
                  className={st.editMenuOption}
                  // onClick={handleEditPageClick}
                >
                  <EditPensil />
                  <span className={st.editMenuOptionText}>Редактировать</span>
                </p>

                <p className={st.editMenuOption}>
                  <Bin /> <span className={st.editMenuOptionText}>Удалить</span>
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
