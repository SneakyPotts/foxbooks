import { useDispatch } from 'react-redux';

import SelectionPage from '../../../components/Selections/SelectionPage';

import { setSelectionById } from '../../../store/selectionSlice';

import SelectionService from '../../../http/SelectionService';

const Selection = (props) => {
  const dispatch = useDispatch();

  dispatch(setSelectionById(props.selectionById));

  return <SelectionPage />;
};

export default Selection;

export async function getServerSideProps({ req, query, params }) {
  const { cookies } = req;
  const { slug } = params;

  const token = cookies.token;

  try {
    const selectionBySlug = await SelectionService.getSelectionBySlug({ token, slug, ...query });

    const { compilation } = selectionBySlug?.data?.data;

    return {
      props: {
        selectionById: selectionBySlug?.data?.data,
        SEO: {
          title: compilation?.seo_title,
          description: compilation?.seo_description,
          og_title: compilation?.og_title,
          og_description: compilation?.og_description,
        },
      },
    };
  } catch {
    return {
      notFound: true, // triggers 404
    };
  }
}
