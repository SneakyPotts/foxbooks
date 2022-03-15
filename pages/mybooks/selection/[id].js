import MySelection from "../../../components/MyBooks/MySelection";

const MyBooksPage = () => {
  return <MySelection />
};

export default MyBooksPage;

export async function getServerSideProps ({ req }) {
  const { cookies } = req
  const token = cookies.token

  if(!token) {
    return {
      redirect: {
        destination: '/',
        parameter: false
      }
    }
  }

  return {
    props: {}
  }
}