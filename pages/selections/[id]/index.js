import SelectionPage from '../../../components/Selections/SelectionPage';
import SelectionService from '../../../http/SelectionService';

const Selection = props => {
  // console.log('selectionsById', props.selectionsById)

  return (
    <div>
      <SelectionPage />
    </div>
  );
};

export default Selection;

// export async function getServerSideProps ({ query }) {
// 	const selectionsById = await SelectionService.getSelectionsById(query)

// 	return {
// 		props: {
// 			selectionsById: selectionsById?.data?.data
// 		}
// 	}
// }
