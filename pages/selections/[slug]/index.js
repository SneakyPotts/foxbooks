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

export async function getServerSideProps({ req, query, params }) {
  const { cookies } = req
  const { slug } = params;
  const token = cookies.token

  try {
    const selectionBySlug = await SelectionService.getSelectionBySlug({token, slug, ...query});

    return {
      props: {
        selectionById: selectionBySlug?.data?.data,
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
