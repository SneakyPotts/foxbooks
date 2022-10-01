import React from 'react';
import BookComponent from '../../../components/Books/category';
import BookService from '../../../http/BookService';
import { useDispatch } from 'react-redux';
import { setBooks, setCategories } from '../../../store/bookSlice';
import CategoriesService from "../../../http/CategoriesService";

const Categories = props => {
  const dispatch = useDispatch();

  dispatch(setCategories(props.categories));
  dispatch(setBooks(props.books));

  return (
    <div>
      <BookComponent />
    </div>
  );
};

export default Categories;

export async function getServerSideProps({ req, params, query }) {
  const { cookies } = req
  const { books_type, category_slug } = params;

  const token = cookies.token

  try {
    const categories = books_type === 'books'
      ? await CategoriesService.getCategories()
      : await CategoriesService.getAudioCategories()

    const categoryData = await CategoriesService.getBookCategories(category_slug);
    const books = await BookService.getBooks({
      ...query,
      type: books_type === 'audiobooks' ? 'audioBooks' : query.type,
      showType: query.showType ? query.showType : 'block',
      sortBy: query.sortBy ? query.sortBy : 1,
      findByCategory: categoryData.data.data[0].id,
      token
    });

    return {
      props: {
        categories: categories?.data?.data,
        books: books?.data?.data,
      },
    }
  } catch {
    return {
      redirect: {
        destination: "/404",
        parameter: false
      }
    };
  }
}
