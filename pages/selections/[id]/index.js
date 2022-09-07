import SelectionPage from '../../../components/Selections/SelectionPage';
import SelectionService from '../../../http/SelectionService';
import {useDispatch} from "react-redux";
import {setSelectionById} from "../../../store/selectionSlice";

const Selection = props => {
  const dispatch = useDispatch()

  dispatch(setSelectionById(props.selectionById))

  return <SelectionPage />
};

export default Selection;

export async function getServerSideProps({ req, query }) {
  const { cookies } = req
  const token = cookies.token

  try {
    const selectionById = await SelectionService.getSelectionById({token, ...query});

    return {
      props: {
        selectionById: selectionById?.data?.data,
      },
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
