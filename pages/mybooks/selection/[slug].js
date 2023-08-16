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
  const userIP =
    req.headers['x-real-ip'] || (req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].split(',')[0]) || req.connection.remoteAddress || req.socket.remoteAddress;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        parameter: false,
      },
    };
  }

  try {
    const selectionBySlug = await SelectionService.getSelectionBySlug({ token, slug, userIP, ...query });

    return {
      props: {
        selectionBySlug: selectionBySlug?.data?.data,
      },
    };
  } catch {
    return {
      notFound: true, // triggers 404
    };
  }
}
