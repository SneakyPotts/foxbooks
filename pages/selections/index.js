import SelectionsPage from '../../components/Selections/idex';
import SelectionService from "../../http/SelectionService";

const Selections = (props) => {
	console.log('selections', props?.selections)

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