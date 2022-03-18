import SelectionsPage from '../../components/Selections';
import SelectionService from "../../http/SelectionService";
import {setSelections} from "../../store/selectionSlice";
import {useDispatch} from "react-redux";

const Selections = (props) => {
	const dispatch = useDispatch()

	dispatch(setSelections(props?.selections))

	return <SelectionsPage />;
};

export default Selections;

export async function getServerSideProps ({ query }) {
	const selections = await SelectionService.getSelections(query)

	return {
		props: {
			selections: selections?.data?.data
		}
	}
}