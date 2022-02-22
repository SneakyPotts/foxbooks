import Link from 'next/link';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import ShowAll from '../shared/common/showAll/ShowAll';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import BooksMainBlock from '../shared/common/booksMainBlock/BooksMainBlock';
import categories from '../data/categories.json';
import MobalModal from '../shared/common/mobalModal';
import st from './audioBooks.module.scss';

const AudioBooks = () => {
  const { innerWidthWindow } = useSelector(state => state.common);

  return (
    <div className={classnames('container', st.abContainer)}>
      {/* <Breadcrumbs data={breadcrumbsData} /> */}

      <h2 className={st.abTitle}>Аудиокниги</h2>
      {innerWidthWindow >= 768 ? (
        <div className={st.head}>
          {categories.map(({ id, category }) => (
            <button key={id} className={st.abCateg}>
              <Link href={`/audiobooks/${id}`}>
                <a className={st.abCategLink}>{category}</a>
              </Link>
            </button>
          ))}
          <ShowAll url="#" text="Показать все" />
          <BookFilters />
        </div>
      ) : (
        <MobalModal audio={true} />
      )}
      <BooksMainBlock audio={true} />
    </div>
  );
};

export default AudioBooks;
