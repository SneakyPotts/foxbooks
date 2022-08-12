import MyBooksLayout from "../../components/shared/common/specific/MyBooksLayout";
import Books from "../../components/MyBooks/Books";
import BookService from "../../http/BookService";
import {useDispatch} from "react-redux";
import {setUserReadingProgress} from "../../store/bookSlice";

const MyBooksPage = ({progresses}) => {
  const dispatch = useDispatch();

  dispatch(setUserReadingProgress(progresses));

  return <Books />
};

MyBooksPage.getLayout = function getLayout(page) {
  return (
    <MyBooksLayout>
      {page}
    </MyBooksLayout>
  )
}

export default MyBooksPage;

export async function getServerSideProps ({ req }) {
  const { cookies } = req
  const token = cookies.token

  const progresses = await BookService.getUserReadingProgresses(token);

  if(!token) {
  	return {
  		redirect: {
  			destination: '/',
  			parameter: false
  		}
  	}
  }

  return {
    props: {
      progresses: progresses?.data?.data
    }
  }
}