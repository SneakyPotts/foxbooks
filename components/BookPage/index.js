import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import classnames from 'classnames';
import ArrowRight from '../../public/chevron-right.svg';
import AboutBook from './AboutBook';
import Comments from './Comments';
import Reviews from './Reviews';
import Quotes from './Quotes';
import AuthorOtherBooks from './AuthorOtherBooks';
import AuthorOtherAudioBooks from './AuthorOtherAudiobooks';
import SimilarBooks from './SimilarBooks';
import st from './bookpage.module.scss';
import s from './SimilarBooks/similarBooks.module.scss';
import {useRouter} from "next/router";
import Breadcrumbs from "../BreadCrumps/BreadCrumps";
import {getAudioBooksByAuthor, getBooksByAuthor} from "../../store/bookSlice";
import AddToMyCompilation from "./AddToMyCompilation";
import Form from "./Form";
import Banners from "../shared/common/Banner/Banners";
import CompilationItem from "../CompilationItem";
import Book from "../shared/common/book";

const BookPage = ({bookType}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const type = bookType

  const audioFlag = bookType === 'audioBooks';

  const { book, booksByAuthor, audioBooksByAuthor } = useSelector(state => state.book);
  const { innerWidthWindow } = useSelector(state => state.common);

  const [myCopmIsVisible, setMyCopmIsVisible] = useState(false)

  const changeSlidesPerView = () => {
    if (innerWidthWindow < 500) return 1;
    if (innerWidthWindow <= 768) return 2;
    if (innerWidthWindow > 768) return 3;
  };

  useEffect(() => {
    const authorId = book?.authors[0]?.id
    if(authorId) {
      dispatch(getBooksByAuthor(authorId))
      dispatch(getAudioBooksByAuthor(authorId))
    }
  }, [])

  if(myCopmIsVisible) {
    return (
      <AddToMyCompilation
        onClose={() => setMyCopmIsVisible(false)}
      />
    )
  }

  return (

              <SimilarBooks
                type={type}
                data={book?.similarBooks} />
  );
};

export default BookPage;
