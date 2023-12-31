import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommentForm from '../../CommentForm';
import CommentItem from '../CommentItem';

import st from './comments.module.scss';

import { addComment, getComments } from '../../../store/commentsSlice';

import MyPagination from '../../shared/common/MyPagination';

const Comments = () => {
  const dispatch = useDispatch();
  const blockRef = useRef();

  const { bookComments } = useSelector((state) => state.comments);
  const { book } = useSelector((state) => state.book);

  const [page, setPage] = useState(1);

  const submitFunc = (data) => {
    let bookType = book?.type;

    if (bookType === 'books') {
      bookType = 'book';
    } else if (bookType === 'audioBooks') {
      bookType = 'audio_book';
    }

    const dataObj = {
      id: book?.id,
      text: data?.text,
      type: bookType,
      parent_comment_id: null,
    };

    dispatch(addComment(dataObj));
  };

  useEffect(() => {
    dispatch(
      getComments({
        id: book?.id,
        type: book?.type,
        page,
      }),
    );
  }, [page, book?.id]);

  return (
    <div
      ref={blockRef}
      className={st.container}
    >
      <h2 className={st.reviewsTitle}>Оставьте свой комментарий</h2>

      <CommentForm submitFunc={submitFunc} />

      {bookComments?.data?.length
        ? bookComments?.data.map((i) => (
            <CommentItem
              key={i?.id}
              data={i}
            />
          ))
        : null}

      {bookComments?.last_page > 1 ? (
        // innerWidthWindow > 768 ?
        <MyPagination
          currentPage={page}
          onClick={setPage}
          lastPage={bookComments?.last_page}
          scrollTo={blockRef}
        />
      ) : // :
      // <div className={st.pagination}>Показать еще</div>
      null}
    </div>
  );
};

export default Comments;
