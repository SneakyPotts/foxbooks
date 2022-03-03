import { useState } from 'react';
import ShowAll from '../../shared/common/showAll/ShowAll';
import st from './mySelections.module.scss';

const MySelections = () => {
  const [books, setBooks] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ]);
  return (
    <div>
      <ul className={st.selectionsList}>
        {books.map(book => (
          <li key={book.id}>
            <div className={st.selection}>
              <div className={st.selectionBlock}>
                <div className={st.selectionImg}>
                  <img src="/horizontalBookCovers/bookCover1.png" alt="" />
                  <div className={st.selectionImgCount}>
                    <span>65 </span>книг
                  </div>
                </div>

                <div className={st.selectionDescription}>
                  <h3>Романтическое фэнтези</h3>
                </div>
              </div>
            </div>
            {/* <span
            className={st.bookListItemDelete}
            onClick={() => showDeletePopap(book.id)}
          >
            <Delete />
          </span> */}
          </li>
        ))}
      </ul>
      <ShowAll text="Показать еще" />
    </div>
  );
};

export default MySelections;
