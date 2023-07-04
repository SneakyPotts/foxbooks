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

    return {
      props: {
        selectionById: selectionBySlug?.data?.data,
      },
    };
  } catch {
    return {
      notFound: true, // triggers 404
    };
  }
}
