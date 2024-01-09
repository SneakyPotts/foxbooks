import { useDispatch } from 'react-redux';

import { MicroMarkingOtherPages } from '../../components/AnaliticsScript/MicroMarking';
import NewPage from '../../components/NewPage';
import { currentYear } from '../../utils';

import { setCurrentPageBanners } from '../../store/adminSlice';
import { setNovelties } from '../../store/noveltiesSlice';

import AdminSettings from '../../http/AdminSettings';
import NoveltiesService from '../../http/NoveltiesService';

const New = (props) => {
  const dispatch = useDispatch();

  dispatch(setNovelties(props.novelties));
  dispatch(setCurrentPageBanners(props.banners));

  return (
    <>
      <MicroMarkingOtherPages {...props.SEO} />
      <NewPage />
    </>
  );
};

export default New;

export async function getServerSideProps({ query }) {
  const novelties = await NoveltiesService.getNovelties(query);
  const banners = await AdminSettings.getPageBanner({ page_slug: 'new' });

  return {
    props: {
      SEO: {
        title: `Новинки книг ${currentYear()} на FoxBooks 🦊| Новинки книжного рынка`,
        description: `Все новинки книг ${currentYear()} в онлайн библиотеке FoxBooks. Просматривайте новинки книжного рынка и читайте или слушайте актуальные новинки на смартфоне или компьютере!`,
        keywords: [`новинки книг ${currentYear()}`, `новинки книжного рынка`],
      },
      novelties: novelties?.data?.data,
      banners: {
        aside: banners?.data?.data,
      },
    },
  };
}
