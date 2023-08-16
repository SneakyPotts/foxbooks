import React from 'react';
import { useDispatch } from 'react-redux';

import BookPage from '../../../components/BookPage';

import { setCurrentPageBanners } from '../../../store/adminSlice';
import { setBook } from '../../../store/bookSlice';

import AdminSettings from '../../../http/AdminSettings';
import BookService from '../../../http/BookService';

const Book = ({ book, books_type, banners, userIP }) => {
  const dispatch = useDispatch();

  dispatch(setBook(book));
  dispatch(setCurrentPageBanners(banners));

  return (
    <BookPage
      bookType={books_type}
      userIP={userIP}
    />
  );
};

export default Book;

export async function getServerSideProps({ req, params }) {
  const userIP =
    req.headers['x-real-ip'] || (req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].split(',')[0]) || req.connection.remoteAddress || req.socket.remoteAddress;

  // let ip;
  //
  // if (req.headers['x-forwarded-for']) {
  //   ip = req.headers['x-forwarded-for'].split(',')[0];
  // } else if (req.headers['x-real-ip']) {
  //   ip = req.connection.remoteAddress;
  // } else {
  //   ip = req.connection.remoteAddress;
  // }

  const { cookies } = req;
  const token = cookies.token;
  const type = params.books_type === 'audiobooks' ? 'audioBooks' : 'books';

  try {
    const book = type === 'books' ? await BookService.getBookBySlug(params?.book_slug, token, userIP) : await BookService.getAudioBookBySlug(params.book_slug, token);
    const similarBooks = await BookService.getSimilarBooks(book.data.data.id, type);

    const banners = await AdminSettings.getPageBanner({ page_slug: params?.book_slug });

    const audioBookChapters = type === 'audioBooks' ? await BookService.audioBookChapters(book.data.data.id) : null;

    return {
      props: {
        book: {
          ...book?.data?.data,
          similarBooks: similarBooks.data.data,
          chapters: audioBookChapters?.data?.data?.chapters || [],
        },
        books_type: type,
        SEO: {
          title: book?.data?.data?.seo_title,
          description: book?.data?.data?.seo_description,
          keywords: book?.data?.data?.seo_keywords,
          og_title: book?.data?.data?.og_title,
          og_description: book?.data?.data?.og_description,
          og_img: book?.data?.data?.og_img,
        },
        banners: banners?.data?.data,
        userIP: userIP,
      },
    };
  } catch {
    return {
      notFound: true, // triggers 404
    };
  }
}
