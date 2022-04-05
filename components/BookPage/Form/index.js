import React from 'react';
import st from "../bookpage.module.scss";
import {useForm} from "react-hook-form";
import BookService from "../../../http/BookService";
import {useRouter} from "next/router";

const Form = ({title}) => {
  const router = useRouter()

  const {register, handleSubmit, reset} = useForm();

  const submitHandler = data => {
    BookService.recommendBook({
      id: router.query?.id,
      type: router.query?.type === 'books' ? 'book' : 'audio_book',
      content: data.content
    }).then(() => {
      reset()
    })
  }

  return (
    <>
      <p className={st.recommendations}>
        Порекомендуйте книги, похожие на “{title}”
      </p>
      <p className={st.recommendationsLabel}>
        по жанру, сюжету, авторам и т.д.
      </p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          {...register("content")}
          placeholder="Поделитесь книгой"
          className={st.recomInput}
        />
      </form>
      <p className={st.recomInputLabel}>
        Убедительная просьба найти соответствующую книгу на сайте FoxBook и
        вставить на нее ссылку, за отсутствием книги на нашем сайте, укажите
        автора или название книги
      </p>
    </>
  );
};

export default Form;