import Link from 'next/link';
import categories from './categories.json';
import ArrowAll from '../../public/arrow-all.svg';
import css from './categories.module.css';

const Categories = () => {
  return (
    <>
      <div className={css.categNav}>
        <h3 className={css.title}>Категории книг</h3>
        <ul className={css.categList}>
          {categories.map(({ id, name }) => (
            <li key={id} className={css.categ}>
              {name}
            </li>
          ))}
        </ul>

        <Link href="/books">
          <a className={css.all}>
            <p className={css.textAll}>Все категории</p>
            <ArrowAll className={css.arrowAll} />
          </a>
        </Link>
      </div>
    </>
  );
};
export default Categories;
