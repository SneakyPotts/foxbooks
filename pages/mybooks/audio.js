import MyBooks from '../../components/MyBooksOld';
import MyBooksLayout from "../../components/shared/common/specific/MyBooksLayout";
import AudioBooks from "../../components/MyBooks/AudioBooks";

const MyBooksPage = () => {
  return <AudioBooks />
};

MyBooksPage.getLayout = function getLayout(page) {
  return (
    <MyBooksLayout>
      {page}
    </MyBooksLayout>
  )
}

export default MyBooksPage;

// export async function getServerSideProps ({ req }) {
//   const { cookies } = req
//   const token = cookies.token
//
//   // if(!token) {
//   // 	return {
//   // 		redirect: {
//   // 			destination: '/',
//   // 			parameter: false
//   // 		}
//   // 	}
//   // }
//
//   return {
//     props: {}
//   }
// }