import AuthorPage from '../../components/AuthorPage';
import BookService from "../../http/BookService";
import {useDispatch} from "react-redux";
import AuthorService from "../../http/AuthorService";
import {setAuthor} from "../../store/authorSlice";

const index = (props) => {
	const dispatch = useDispatch()

	dispatch(setAuthor(props.author))

	return <AuthorPage />;
};

export default index;

export async function getServerSideProps ({query}) {
	const author = await AuthorService.getAuthor(query?.id)

	return {
		props: {
			author: author?.data?.data
		}
	}
}
