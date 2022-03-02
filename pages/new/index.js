import NewPage from '../../components/NewPage';
import {useDispatch} from "react-redux";
import {setNovelties} from "../../store/noveltiesSlice";
import NoveltiesService from "../../http/NoveltiesService";

const New = (props) => {
	const dispatch = useDispatch()

	dispatch(setNovelties(props.novelties))

	return <NewPage />
};

export default New;

export async function getServerSideProps ({ query }) {
	const novelties = await NoveltiesService.getNovelties(query)

	return {
		props: {
			novelties: novelties?.data?.data
		}
	}
}