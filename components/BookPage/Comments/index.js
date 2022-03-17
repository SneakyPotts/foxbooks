import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import st from './comments.module.scss';
import MyPagination from '../../shared/common/MyPagination';
import {useRouter} from "next/router";
import CommentForm from "../../CommentForm";
import {addComment, setBookComments} from "../../../store/commentsSlice";
import CommentItem from "../CommentItem";
import CommentsService from "../../../http/CommentsService";

const Comments = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { innerWidthWindow } = useSelector(state => state.common);
  const { bookComments } = useSelector(state => state.comments);

  const [page, setPage] = useState(1);

  const submitFunc = data => {
    let t = router.query?.type

    if(t === 'books') {
      t = 'book'
    } else if(t === 'audioBooks') {
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

  useEffect(async () => {
    const response = await CommentsService.getComments({
      id: router.query?.id,
      type: router.query?.type,
      page
    })

    dispatch(setBookComments(response?.data?.data))
  }, [page])

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

      {bookComments?.last_page > 1 ?
        // innerWidthWindow > 768 ?
          <MyPagination
            currentPage={page}
            onClick={setPage}
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
