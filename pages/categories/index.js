import Link from 'next/link';
import categories from '../../components/data/categories.json';
import st from './categories.module.scss';

const Categories = () => {
  return (
    <>
      <div className="container">
        <h2>Категории</h2>
        <ul className={st.catList}>
          {categories.map(cat => (
            <Link key={cat.id} href="#">
              <a className={st.catItem}>{cat.category}</a>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Categories;
