import { useDispatch } from 'react-redux';

import AuthorPage from '../../components/AuthorPage';

import { setCurrentPageBanners } from '../../store/adminSlice';
import { setAuthor } from '../../store/authorSlice';
import { setCategories } from '../../store/bookSlice';

import AdminSettings from '../../http/AdminSettings';
import AuthorService from '../../http/AuthorService';
import CategoriesService from '../../http/CategoriesService';

const index = (props) => {
  const dispatch = useDispatch();

  dispatch(setAuthor(props.author));
  dispatch(setCategories(props.categories));
  dispatch(setCurrentPageBanners(props.banners));

  return <AuthorPage />;
};

export default index;

export async function getServerSideProps({ req, params }) {
  const { cookies } = req;
  const token = cookies.token;

  try {
    const author = await AuthorService.getAuthor(params.slug, token);
    const banners = await AdminSettings.getPageBanner({ page_slug: params.slug });

    const categories = await CategoriesService.getCategoriesWithCount();

    return {
      props: {
        author: author?.data?.data,
        categories: categories?.data?.data,
        banners: banners?.data?.data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/404',
        parameter: false,
      },
    };
  }
}
