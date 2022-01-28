import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CommentComp from '../CommentComponent';
import Button from '../../shared/common/Button/Button';
import UnderCom from '../UnderCommentComp';
import st from './comments.module.scss';
import MyPagination from '../../shared/common/MyPagination';

const Comments = () => {
  const [showReplys, setShowReplys] = useState([
    { id: '0', flag: false },
    { id: '1', flag: false },
    { id: '2', flag: false },
  ]);
  // const [showInput, setShowInput] = useState(false);

  const [firstInput, setFirstInput] = useState(false);

  const data = [
    { id: '0', flagData: true },
    { id: '1', flagData: true },
    { id: '2', flagData: false },
  ];

  const handleFirstInput = () => {
    setFirstInput(true);
  };

  const handleCancelBtn = () => {
    setFirstInput(null);
    setReplyIdx(null);
    setUnderComIdx(null);
  };

  return (
    <div className={st.container}>
      <h2 id="reviews" className={st.reviewsTitle}>
        Оставьте свой комментарий
      </h2>
      <form className={st.user}>
        <div className={st.userFormHeader}>
          <div className={st.userIcon}>
            <Image
              src="/horizontalBookCovers/book.png"
              alt=""
              width="35"
              height="35"
              // placeholder="blur"
              blurDataURL="/images/blur.jpg"
            />
          </div>
          <input
            placeholder="Написать комментарий"
            className={st.userInput}
            onClick={handleFirstInput}
          />
        </div>
        <div className={st.userComment}>
          {firstInput && (
            <div className={st.controllBtn}>
              <Button
                typeButton="submit"
                text="Отправить"
                classNames={st.submitButton}
              />
              <button className={st.cancelBtn} onClick={handleCancelBtn}>
                Отменить
              </button>
            </div>
          )}
        </div>
      </form>
      {data.map(({ id, flagData }, idx) => (
        <>
          <div key={id} className={st.reviewBlock}>
            <CommentComp idx={idx} />
          </div>

          <>
            {flagData && (
              <UnderCom
                showReplys={showReplys}
                setShowReplys={setShowReplys}
                data={data}
              />
            )}

            {flagData && (
              <Link href="#">
                <a>
                  <h3 className={st.showNextComments}>
                    Показать следующие комментарии
                  </h3>
                </a>
              </Link>
            )}
          </>
        </>
      ))}

      <MyPagination />
    </div>
  );
};

export default Comments;
