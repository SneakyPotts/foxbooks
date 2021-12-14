// import Breadcrumbs from '../../../components/BreadCrumps/BreadCrumps';
import { useRouter } from 'next/router';
import Header from '../../../components/Header';
import Category from '../../../components/AudioBooks/category';
import Footer from '../../../components/Footer';

const Categories = () => {
  const testete = useRouter();
  console.log(testete, '555555555555555555555555');

  return (
    <>
      {/* <Breadcrumbs data={breadcrumbsData} /> */}
      <Category />
    </>
  );
};
export default Categories;
