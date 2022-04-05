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

export async function getServerSideProps({ query }) {
  const selectionById = await SelectionService.getSelectionById(query);

  return {
    props: {
      selectionById: selectionById?.data?.data,
    },
  };
}
