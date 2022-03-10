import React, {useState} from 'react';
import styles from './styles.module.scss'
import Image from "next/image";
import Link from "next/link";
import Eye from "../shared/icons/eye";
import Like from "../shared/icons/heart";
import Comment from "../shared/icons/comment";
import classNames from "classnames";
import HorizontalDots from "../shared/icons/horizontalDots";
import EditPensil from "../shared/icons/editPencil";
import Bin from "../shared/icons/trash";
import DrawerPopup from "../shared/common/DrawerPopup";

const ReviewLogicItem = ({
  type,
  data,
  withControls,
  onDelete
}) => {
  const [controlsIsVisible, setControlsIsVisible] = useState(false);

  return (
    <div className={styles.review}>
      <div className={styles.reviewCover}>
        <Link href={'/'}>
          <a>
            <Image
              src={data.img}
              alt=""
              width="86"
              height="143"
            />
          </a>
        </Link>
        <div className={styles.bookWrapper}>
          <Link href={'/'}>
            <a className={styles.bookTitle}>{data.book_title}</a>
          </Link>
          <Link href={'/'}>
            <a className={styles.bookAuthor}>{data.book_author}</a>
          </Link>
        </div>
      </div>

      <div className={styles.reviewInfo}>
        <span className={styles.reviewDate}>{data.review_data}</span>
        <div className={styles.reviewViews}>
          <span className={styles.sumReviews}>{data.sum_reviews}</span>
          <Eye/>
        </div>
      </div>

      <p className={styles.reviewTitle}>{data.review_title}</p>
      <p className={styles.reviewText}>{data.review_text}</p>

      <div className={styles.reviewBottom}>
        <div className={styles.reviewBottomStatistic}>
          <span className={styles.reviewIcon}>
            <Like/>
          </span>
          <span className={styles.reviewLike}>{data.likes}</span>
          <span className={styles.reviewIcon}>
            <Comment/>
          </span>
          <span>{data.comments}</span>
        </div>

        {withControls &&
          <div>
            <span
              className={classNames(styles.controlsIcon, {
                [styles.active]: controlsIsVisible,
              })}
              onClick={() => setControlsIsVisible(prev => !prev)}
            >
              <HorizontalDots/>
            </span>

            {controlsIsVisible &&
              <DrawerPopup
                direction={'up'}
                onClose={() => setControlsIsVisible(false)}
              >
                <div
                  className={styles.controlsItem}
                  // onClick={e => handleEditPageClick(e)}
                >
                  <EditPensil />
                  Редактировать
                </div>

                <div
                  className={styles.controlsItem}
                  onClick={onDelete}
                >
                  <Bin />
                  Удалить
                </div>
              </DrawerPopup>
            }
          </div>
        }
      </div>
    </div>
  );
};

export default ReviewLogicItem;
