import AuthorPage from '../../components/AuthorPage';
import {useDispatch} from "react-redux";
import AuthorService from "../../http/AuthorService";
import {setAuthor} from "../../store/authorSlice";

const index = (props) => {
	const dispatch = useDispatch()

	dispatch(setAuthor(props.author))

	return <AuthorPage />;
};

export default index;

export async function getServerSideProps ({params}) {
	const author = await AuthorService.getAuthor(params.slug);

	return {
		props: {
			author: author?.data?.data
		}
	}
}
