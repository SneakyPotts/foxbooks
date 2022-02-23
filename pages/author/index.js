import AuthorPage from '../../components/AuthorPage';
import BookService from "../../http/BookService";
import {useDispatch} from "react-redux";
import AuthorService from "../../http/AuthorService";

const index = (props) => {
	const dispatch = useDispatch()

	console.log(props.author)
	return <AuthorPage />;
};

export default index;

export async function getServerSideProps ({query}) {
	const author = await AuthorService.getAuthor(query?.id)
	console.log(author)
	return {
		props: {
			author: author?.data?.data
		}
	}
}
