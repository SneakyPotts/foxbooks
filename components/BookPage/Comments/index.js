import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import CommentComp from '../CommentComponent';
import Button from '../../shared/common/Button/Button';
import UnderCom from '../UnderCommentComp';
import st from './comments.module.scss';
import MyPagination from '../../shared/common/MyPagination';
import {useForm} from "react-hook-form";
import CommentsService from "../../../http/CommentsService";
import {useRouter} from "next/router";

const Comments = ({ comments }) => {
  const router = useRouter()
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
  const { innerWidthWindow } = useSelector(state => state.common);

  const handleFirstInput = () => {
    setFirstInput(true);
  };

  const handleCancelBtn = () => {
    setValue('comment', '')
    setFirstInput(false);
    // setReplyIdx(null);
    // setUnderComIdx(null);
  };

  const {register, handleSubmit, setValue, formState: {errors}} = useForm();

  const onSubmit = async data => {
    console.log(data)
    await CommentsService.addComments({
      id: router.query?.id,
      text: data?.comment,
      type: 'book'
    })
    setValue('comment', '')
    setFirstInput(false)
  }

  return (
    <div className={st.container}>
      <h2 id="reviews" className={st.reviewsTitle}>
        Оставьте свой комментарий
      </h2>
      <form
        className={st.user}
        onSubmit={handleSubmit(onSubmit)}
      >
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
            {...register('comment')}
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
      {comments.map(({ id, flagData }, idx) => (
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

      {innerWidthWindow > 768 ? (
        <MyPagination />
      ) : (
        <div className={st.pagination}>Показать еще</div>
      )}
    </div>
  );
};

export default Comments;
