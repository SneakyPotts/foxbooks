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
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import ReviewForm from "../ReviewForm";
import {useSelector} from "react-redux";
import DotsDropdown from "../DotsDropdown";

const ReviewLogicItem = ({
  type,
  data,
  withControls,
  onDelete
}) => {
  const { innerWidthWindow } = useSelector(state => state.common)

  const [controlsIsVisible, setControlsIsVisible] = useState(false);
  const [editFormIsVisible, setEditFormIsVisible] = useState(false)

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
            <DotsDropdown
              isSmall
              direction={'up'}
            >
              <div
                className={styles.controlsItem}
                onClick={() => setEditFormIsVisible(true)}
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
            </DotsDropdown>
          </div>
        }
      </div>

      {editFormIsVisible &&
        <ModalWindow
          isFullScreen={innerWidthWindow <= 768}
          onClose={() => setEditFormIsVisible(false)}
        >
          <ReviewForm
            title={data.review_title}
            text={data.review_text}
            onCancel={() => setEditFormIsVisible(false)}
          />
        </ModalWindow>
      }
    </div>
  );
};

export default ReviewLogicItem;
