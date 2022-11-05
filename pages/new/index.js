import NewPage from '../../components/NewPage';
import {useDispatch} from "react-redux";
import {setNovelties} from "../../store/noveltiesSlice";
import NoveltiesService from "../../http/NoveltiesService";
import AdminSettings from "../../http/AdminSettings";
import {setCurrentPageBanners} from "../../store/adminSlice";

const New = (props) => {
	const dispatch = useDispatch()

	dispatch(setNovelties(props.novelties));
	dispatch(setCurrentPageBanners(props.banners));

	return <NewPage />
};

export default New;

export async function getServerSideProps ({ query }) {
	const novelties = await NoveltiesService.getNovelties(query);
	const banners = await AdminSettings.getPageBanner({page_slug: 'novelties'});

	return {
		props: {
			SEO: {
				title: `Новинки книг ${new Date().getFullYear()} на FoxBooks 🦊| Новинки книжного рынка`,
				description: `Все новинки книг ${new Date().getFullYear()} в онлайн библиотеке FoxBooks. Просматривайте новинки книжного рынка и читайте или слушайте актуальные новинки на смартфоне или компьютере!`,
				keywords: [`новинки книг ${new Date().getFullYear()}`, `новинки книжного рынка`]
			},
			novelties: novelties?.data?.data,
			banners: banners?.data?.data,
		}
	}
}