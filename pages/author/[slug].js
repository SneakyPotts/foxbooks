import {useDispatch} from "react-redux";
import AuthorPage from '../../components/AuthorPage';
import AuthorService from "../../http/AuthorService";
import AdminSettings from "../../http/AdminSettings";
import {setAuthor} from "../../store/authorSlice";
import {setCurrentPageBanners} from "../../store/adminSlice";

const index = (props) => {
  const dispatch = useDispatch()

  dispatch(setAuthor(props.author));
	dispatch(setCurrentPageBanners(props.banners));

  return <AuthorPage/>;
};

export default index;

export async function getServerSideProps({params}) {
  try {
    const author = await AuthorService.getAuthor(params.slug);
		const banners = await AdminSettings.getPageBanner({page_slug: params.slug});

    return {
      props: {
        author: author?.data?.data,
				banners: banners?.data?.data,
      }
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
