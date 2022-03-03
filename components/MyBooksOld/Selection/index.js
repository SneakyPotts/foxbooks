import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { FiSearch } from 'react-icons/fi';
import Button from '../../shared/common/Button/Button';
import Book from '../../shared/common/book';
import Dots from '../../shared/icons/horizontalDots';
import EditPensil from '../../shared/icons/editPencilSelection';
import Bin from '../../shared/icons/trash';
import ArrowAll from '../../../public/chevron-down.svg';
import All from '../../shared/icons/all';
import BookMark from '../../shared/icons/BookMark';
import OpenBook from '../../shared/icons/bookOpen';
import Flag from '../../shared/icons/flag';
import AddBook from './AddBook';
import Edit from '../Edit';
import st from './selection.module.scss';

const Selection = () => {
  const [editMenu, setEditMenu] = useState(false);
  const [menu, setMenu] = useState(false);
  const [activeOption, setActiveOption] = useState('Все');
  const [showInput, setShowInput] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Популярные');
  const [filter, setFilter] = useState(false);
  const [filterIdx, setFilterIdx] = useState(null);
  const [books, setBooks] = useState([{ id: 0 }, { id: 1 }]);
  const [addBookPage, setAddBookPage] = useState(false);
  const [editPage, setEditPage] = useState(false);

  const options = [
    { option: 'Все', svg: <All /> },
    { option: 'Хочу прочитать', svg: <BookMark /> },
    { option: 'Читаю', svg: <OpenBook /> },
    { option: 'Прочитано', svg: <Flag /> },
  ];
  const popular = [
    { option: 'Популярные' },
    { option: 'По дате добавления' },
    { option: 'По алфавиту' },
  ];

  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('click', close);

    return () => {
      body.removeEventListener('click', close);
    };
  }, []);

  const handleAddBtn = () => {
    setAddBookPage(true);
  };

  const openEditMenu = e => {
    e.stopPropagation();
    setEditMenu(!editMenu);
  };

  const handleEditPageClick = () => {
    setEditPage(true);
    const body = document.querySelector('body');
    body.classList.add('nonScroll');
  };

  const togle = e => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const handleInput = e => {
    e.stopPropagation();
    setShowInput(true);
  };

  const handleOptions = (idx, e) => {
    e.stopPropagation();
    setActiveOption(options[idx].option);
  };

  const handleClick = e => {
    e.stopPropagation();
    setFilter(!filter);
  };

  const filterClick = idx => {
    setActiveFilter(popular[idx].option);
    setFilterIdx(idx);
  };

  const close = () => {
    setEditMenu(false);
    setShowInput(false);
    setFilter(null);
    setMenu(false);
  };

  return (
    <>
      <div className={st.selectionCover}>
        <h1 className={st.selectionName}>Дизайн</h1>
        <div className={st.selectionBtns}>
          <Button text="Добавить книгу" click={handleAddBtn} />
          <div
            className={classnames(st.selectionBtnsDots, {
              [st.dotsActive]: editMenu,
            })}
            onClick={openEditMenu}
          >
            <Dots />
            {editMenu && (
              <div className={st.editMenu}>
                <p className={st.editMenuOption} onClick={handleEditPageClick}>
                  <EditPensil />
                  <span className={st.editMenuOptionText}>Редактировать</span>
                </p>

                <p className={st.editMenuOption}>
                  <Bin /> <span className={st.editMenuOptionText}>Удалить</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classnames('container', st.section)}>
        <div className={st.tab}>
          <h2>{books.length}</h2>
          <p>Книги</p>
        </div>
        <div className={st.filters}>
          <div className={st.options}>
            <span className={st.optionsLabel}>Статус</span>
            <div className={st.dropdown}>
              <button
                className={classnames(st.dropdownBtn, {
                  [st.active]: menu,
                })}
                onClick={togle}
              >
                {activeOption}
                <ArrowAll
                  className={classnames(st.down, {
                    [st.up]: menu,
                  })}
                />
              </button>
              {menu && (
                <ul className={st.dropdownList}>
                  {options.map((opt, idx) => (
                    <li
                      key={opt.option}
                      className={st.dropdownListItem}
                      onClick={e => handleOptions(idx, e)}
                    >
                      {opt.svg}
                      <span>{opt.option}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={st.filter}>
            <div className={st.input} onClick={handleInput}>
              <FiSearch
                className={classnames(st.inputSvg, {
                  [st.inputSvgIcon]: showInput,
                })}
              />
              {showInput && (
                <input placeholder="Искать книгу" className={st.inputSearch} />
              )}
            </div>
            <div className={st.dropdownPopular}>
              <button
                className={classnames(st.dropdownPopularBtn, {
                  [st.active]: filter,
                })}
                onClick={handleClick}
              >
                {activeFilter}
                <ArrowAll
                  className={classnames(st.down, {
                    [st.up]: filter,
                  })}
                />
              </button>
              {filter && (
                <ul
                  className={st.dropdownPopularList}
                  onClick={e => e.stopPropagation()}
                >
                  {popular.map((opt, idx) => (
                    <li
                      key={opt.option + 1}
                      className={st.dropdownPopularListItem}
                      onClick={() => filterClick(idx)}
                    >
                      <span
                        className={classnames(st.radio, {
                          [st.radioActive]: filterIdx === idx,
                        })}
                      ></span>
                      <span>{opt.option}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className={st.bookList}>
          {books.map(book => (
            <div
              key={book.id}
              className={st.bookListItem}
              onClick={e => onBookClick(e)}
            >
              <Book />
            </div>
          ))}
        </div>
      </div>
      {addBookPage && (
        <div className={st.addBook}>
          <AddBook setAddBookPage={setAddBookPage} />
        </div>
      )}
      {editPage && (
        <div className={st.editPage}>
          <Edit setEditPage={setEditPage} setAddBookPage={setAddBookPage} />
        </div>
      )}
    </>
  );
};
export default Selection;
