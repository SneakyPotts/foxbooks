import React from 'react';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import CommentComp from '../CommentComponent';
import Button from '../../shared/common/Button/Button';
import moment from "moment";
import 'moment/locale/ru'
import UnderCom from '../UnderCommentComp';
import st from './comments.module.scss';
import MyPagination from '../../shared/common/MyPagination';
import {useForm} from "react-hook-form";
import CommentsService from "../../../http/CommentsService";
import {useRouter} from "next/router";
import {commentBook} from "../../../store/bookSlice";

const Comments = ({ comments }) => {
  moment.locale('ru')
  const router = useRouter()
  const dispatch = useDispatch()
  const [firstInput, setFirstInput] = useState(false);
  const { innerWidthWindow } = useSelector(state => state.common);
  const { book } = useSelector(state => state.book);
  const {id: idUser} = useSelector(state => state.profile.profile);

  const handleFirstInput = (e) => {
    console.log(idUser)
    console.log(book)
    if(e.target.value.length > 0) {
      setFirstInput(true);
    } else {
      setFirstInput(false);
    }
  };

  const handleCancelBtn = () => {
    setValue('comment', '')
    setFirstInput(false);
  };

  const {register, handleSubmit, setValue, formState: {errors}} = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    dispatch(commentBook({book_id: 28,
      content: data?.comment,
      created_at: moment().format(),
      parent_comment_id: null,
      user_id: idUser
    }))

    // await CommentsService.addComments({
    //   id: router.query?.id,
    //   text: data?.comment,
    //   type: 'book',
    //   parent_comment_id: null,
    // })
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
          {/*<input {...register('id')} type="hidden" value={1}/>*/}
          <input
            {...register('comment')}
            placeholder="Написать комментарий"
            className={st.userInput}
            onChange={handleFirstInput}
            autoComplete="off"
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
      {comments.map(({content, created_at, reviews_count }, idx) => (
        <>
          <div key={created_at} className={st.reviewBlock}>
            <CommentComp
                idx={idx}
                content={content}
                reviewsCount={reviews_count}
                time={moment(created_at).format('Do MMMM YYYY в HH:mm')
                    .replace('-го', '')}
            />
          </div>
          <>
              {/*<UnderCom*/}
              {/*  showReplys={showReplys}*/}
              {/*  setShowReplys={setShowReplys}*/}
              {/*  data={data}*/}
              {/*/>*/}

              {/*<Link href="#">*/}
              {/*  <a>*/}
              {/*    <h3 className={st.showNextComments}>*/}
              {/*      Показать следующие комментарии*/}
              {/*    </h3>*/}
              {/*  </a>*/}
              {/*</Link>*/}

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
