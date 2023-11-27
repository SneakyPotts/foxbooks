import { useDispatch } from 'react-redux';

import AuthorPage from '../../components/AuthorPage';

import { setCurrentPageBanners } from '../../store/adminSlice';
import { setAuthor } from '../../store/authorSlice';
import { setCategories } from '../../store/bookSlice';

import AdminSettings from '../../http/AdminSettings';
import AuthorService from '../../http/AuthorService';
import CategoriesService from '../../http/CategoriesService';

const AuthorBySlugPage = (props) => {
  const dispatch = useDispatch();

  dispatch(setAuthor(props.author));
  dispatch(setCategories(props.categories));
  dispatch(setCurrentPageBanners(props.banners));

  return <AuthorPage infoBlocks={props.authorInfoBlock} />;
};

export default AuthorBySlugPage;

export async function getServerSideProps({ req, params }) {
  const { cookies } = req;
  const token = cookies.token;

  try {
    const author = await AuthorService.getAuthor(params.slug, token);
    const banners = await AdminSettings.getPageBanner({ page_slug: params.slug });
    const authorInfoBlock = await AuthorService.getAuthorInfoBlock(params.slug);

    const categories = await CategoriesService.getCategoriesWithCount();

    return {
      props: {
        author: author?.data?.data,
        categories: categories?.data?.data,
        SEO: {
          title: author?.data?.data?.seo_title,
          description: author?.data?.data?.seo_description,
          keywords: author?.data?.data?.seo_keywords || '',
          og_title: author?.data?.data?.og_title || '',
          og_description: author?.data?.data?.og_description || '',
          og_img: author?.data?.data?.og_img || '',
        },
        banners: banners?.data?.data,
        authorInfoBlock: authorInfoBlock?.data.data,
      },
    };
  } catch {
    return {
      notFound: true, // triggers 404
    };
  }
}
