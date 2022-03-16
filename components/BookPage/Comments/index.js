import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import st from './comments.module.scss';
import MyPagination from '../../shared/common/MyPagination';
import {useRouter} from "next/router";
import CommentForm from "../../CommentForm";
import {addComment} from "../../../store/commentsSlice";
import CommentItem from "../CommentItem";

const Comments = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { innerWidthWindow } = useSelector(state => state.common);
  const { bookComments } = useSelector(state => state.comments);

  const submitFunc = data => {
    let t = type

    if(router.query?.type === 'books') {
      t = 'book'
    } else if(router.query?.type === 'audioBooks') {
      t = 'audio_books'
    }

    const dataObj = {
      id: router.query?.id,
      text: data?.text,
      type: t,
      parent_comment_id: null,
    }

    dispatch(addComment(dataObj))
  }

  return (
    <div className={st.container}>
      <h2 className={st.reviewsTitle}>Оставьте свой комментарий</h2>

      <CommentForm
        submitFunc={submitFunc}
      />

      {bookComments?.data?.length ?
        bookComments?.data.map(i =>
          <CommentItem
            key={i?.id}
            data={i}
          />
        ) : null
      }

      {/*<UnderCom*/}
      {/*  showReplys={showReplys}*/}
      {/*  setShowReplys={setShowReplys}*/}
      {/*  data={data}*/}
      {/*/>*/}

      {bookComments?.last_page > 1 ?
        // innerWidthWindow > 768 ?
          <MyPagination
            lastPage={bookComments?.last_page}
          />
          // :
          // <div className={st.pagination}>Показать еще</div>
        : null
      }
    </div>
  );
};

export default Comments;
