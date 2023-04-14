import { useDispatch } from 'react-redux';

import MySelection from '../../../components/MyBooks/MySelection';

import { setSelectionById } from '../../../store/selectionSlice';

import SelectionService from '../../../http/SelectionService';

const MyBooksPage = (props) => {
  const dispatch = useDispatch();

  dispatch(setSelectionById(props.selectionBySlug));

  return <MySelection />;
};

export default MyBooksPage;

export async function getServerSideProps({ req, query, params }) {
  const { cookies } = req;
  const { slug } = params;
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        parameter: false,
      },
    };
  }

  try {
    const selectionBySlug = await SelectionService.getSelectionBySlug({ ...query, slug, token });

    return {
      props: {
        selectionBySlug: selectionBySlug?.data?.data,
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
