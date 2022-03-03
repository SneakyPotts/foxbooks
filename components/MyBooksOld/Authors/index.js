import Image from 'next/image';
import st from './authors.module.scss';

const Authors = () => {
  const authors = [
    { id: '0', name: 'Джоан Кэтлин Роулинг', books: '11' },
    { id: '1', name: 'Джоан Кэтлин Роулинг', books: '11' },
  ];
  return (
    <ul className={st.authors}>
      {authors.map(auth => (
        <li key={auth.id} className={st.author}>
          <Image
            src="/reviewsBookCovers/author.png"
            width={180}
            height={272}
            alt="author"
          />
          <h3 className={st.authorName}>{auth.name}</h3>
          <p className={st.authorBooks}>
            {auth.books} <span>книг</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Authors;
