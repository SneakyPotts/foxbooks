import { useDispatch } from 'react-redux';

import { MicroMarkingOtherPages } from '../../components/AnaliticsScript/MicroMarking';
import SelectionsPage from '../../components/Selections';

import { setCurrentPageBanners } from '../../store/adminSlice';
import { setSelections } from '../../store/selectionSlice';

import AdminSettings from '../../http/AdminSettings';
import SelectionService from '../../http/SelectionService';

const Selections = (props) => {
  const dispatch = useDispatch();

  dispatch(setSelections(props?.selections));
  dispatch(setCurrentPageBanners(props.banners));

  return (
    <>
      <MicroMarkingOtherPages {...props.SEO} />
      <SelectionsPage />
    </>
  );
};

export default Selections;

export async function getServerSideProps({ req, query }) {
  const { cookies } = req;
  const token = cookies.token;

  const selections = await SelectionService.getSelections({ token, ...query });
  const banners = await AdminSettings.getPageBanner({ page_slug: 'selections' });

  return {
    props: {
      SEO: {
        title: `Лучшие подборки книг на FoxBooks 🦊| Электронные книги бесплатно`,
        description: `Тематические списки и лучшие подборки книг всех жанров от редакции FoxBooks: от лучших антиутопий до научной фантастики и романов! Читайте онлайн на смартфонах и компьютерах!`,
        keywords: [`лучшие подборки книг`, `электронные книги бесплатно`],
      },
      selections: selections?.data?.data,
      banners: {
        aside: banners?.data?.data,
      },
    },
  };
}
