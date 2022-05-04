import React, {useState} from 'react';
import styles from './styles.module.scss'
import Image from "next/image";
import Link from "next/link";
import Eye from "../shared/icons/eye";
import Like from "../shared/icons/heart";
import Comment from "../shared/icons/comment";
import EditPensil from "../shared/icons/editPencil";
import Bin from "../shared/icons/trash";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import ReviewForm from "../ReviewForm";
import {useSelector} from "react-redux";
import DotsDropdown from "../DotsDropdown";
import moment from "moment";
import 'moment/locale/ru'

const ReviewLogicItem = ({
  type,
  data,
  withControls,
  onDelete
}) => {
  const { innerWidthWindow } = useSelector(state => state.common)

  const [editFormIsVisible, setEditFormIsVisible] = useState(false)

  return (
    <div className={styles.review}>
      <div className={styles.reviewCover}>
        <Link href={`/book/${data?.book?.id}?type=books`}>
          <a>
            <Image
              src={data?.book?.image?.link || '/preview.jpg'}
              alt="Picture"
              width="86"
              height="143"
              placeholder="blur"
              blurDataURL="/blur.webp"
            />
          </a>
        </Link>
        <div className={styles.bookWrapper}>
          <Link href={`/book/${data?.book?.id}?type=books`}>
            <a className={styles.bookTitle}>{data?.book?.title}</a>
          </Link>
          <Link href={`author?id=${data?.book?.authors[0].id}`}>
            <a className={styles.bookAuthor}>{data?.book?.authors[0].author}</a>
          </Link>
        </div>
      </div>

      <div className={styles.reviewInfo}>
        <span className={styles.reviewDate}>{moment(data?.created_at).format('D MMMM YYYY в LT')}</span>
        <div className={styles.reviewViews}>
          <span className={styles.sumReviews}>{data?.views_count}</span>
          <Eye/>
        </div>
      </div>

      <p className={styles.reviewTitle}>{data?.title}</p>
      <p className={styles.reviewText}>{data?.content}</p>

      <div className={styles.reviewBottom}>
        <div className={styles.reviewBottomStatistic}>
          <span className={styles.reviewIcon}>
            <Like/>
          </span>
          <span className={styles.reviewLike}>{data?.likes_count}</span>
          <span className={styles.reviewIcon}>
            <Comment/>
          </span>
          <span>{data?.comments_count}</span>
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
            title={data?.title}
            text={data?.content}
            onCancel={() => setEditFormIsVisible(false)}
          />
        </ModalWindow>
      }
    </div>
  );
};

export default ReviewLogicItem;
