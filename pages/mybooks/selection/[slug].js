import MySelection from "../../../components/MyBooks/MySelection";
import SelectionService from "../../../http/SelectionService";
import {useDispatch} from "react-redux";
import {setSelectionById} from "../../../store/selectionSlice";

const MyBooksPage = (props) => {
  const dispatch = useDispatch()

  dispatch(setSelectionById(props.selectionBySlug))

  return <MySelection />
};

export default MyBooksPage;

export async function getServerSideProps ({ req, query, params }) {
  const { cookies } = req
  const { slug } = params
  const token = cookies.token

  if(!token) {
    return {
      redirect: {
        destination: '/',
        parameter: false
      }
    }
  }

  try {
    const selectionBySlug = await SelectionService.getSelectionBySlug({...query, slug});

    return {
      props: {
        selectionBySlug: selectionBySlug?.data?.data,
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
