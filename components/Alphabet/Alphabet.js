import Link from 'next/link';
import alphabet from './alphabet.json';
import css from './alphabet.module.css';
const Alphabet = () => {
  return (
    <div className={css.filterContainer}>
      <div className={css.filter}>
        <p className={css.title}>Автор:</p>
        <ul className={css.alphabet}>
          {alphabet.map(({ id, letter }) => (
            <li key={id} className={css.leter}>
              <Link href="#">
                <a>{letter}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={css.filter}>
        <p className={css.title}>Книги:</p>
        <ul className={css.alphabet}>
          {alphabet.map(({ id, letter }) => (
            <li key={id} className={css.leter}>
              <Link href="#">
                <a>{letter}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Alphabet;
