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
  const { type, slug } = params;

  const token = cookies.token
  const categories = type === 'books'
    ? await CategoriesService.getCategories()
    : await CategoriesService.getAudioCategories()

  const categoryData = await CategoriesService.getBookCategories(slug);
  const books = await BookService.getBooks({
    ...query,
    type: query.type === 'audiobooks' ? 'audioBooks' : query.type,
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
  };
}
