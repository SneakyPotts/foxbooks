import Books from '../../components/MyBooks/Books';

import BookService from '../../http/BookService';
import CommonService from '../../http/CommonService';

import MyBooksLayout from '../../components/shared/common/specific/MyBooksLayout';

const MyBooksPage = () => {
  return <Books />;
};

MyBooksPage.getLayout = function getLayout(page, layoutProps) {
  return <MyBooksLayout {...layoutProps}>{page}</MyBooksLayout>;
};

export default MyBooksPage;

export async function getServerSideProps({ req }) {
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        parameter: false,
      },
    };
  }

  const userProgress = await BookService.getUserReadingProgresses(token);
  const counters = await CommonService.getMyListCounters(token);

  return {
    props: {
      userProgress: userProgress?.data.data,
      counters: counters?.data.data,
    },
  };
}
