import MySelection from "../../../components/MyBooks/MySelection";
import SelectionService from "../../../http/SelectionService";
import {useDispatch} from "react-redux";
import {setSelectionById} from "../../../store/selectionSlice";

const MyBooksPage = (props) => {
  const dispatch = useDispatch()

  dispatch(setSelectionById(props.selectionById))

  return <MySelection />
};

export default MyBooksPage;

export async function getServerSideProps ({ req, query }) {
  const { cookies } = req
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
    const selectionById = await SelectionService.getSelectionById(query);

    return {
      props: {
        selectionById: selectionById?.data?.data,
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
