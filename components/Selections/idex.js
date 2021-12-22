import { useState } from 'react';
import Switcher from '../switcher/Switcher';
import SelectionGrid from './selectionsGrid';
import SelectionsList from './selectionsList';
import st from './selections.module.scss';

const SelectionsPage = ({ audio }) => {
  const popularSelections = [
    { id: '0', option: 'Все' },
    { id: '1', option: 'Тематические' },
    { id: '2', option: 'Регулярные' },
  ];

  const booksSelections = [
    { id: '0', option: 'Все' },
    { id: '1', option: 'Книги' },
    { id: '2', option: 'Аудиокниги' },
  ];

  //   const [stateIndex, setStateIndex] = useState(null);
  const [flagSwitcher, setFlagSwitcher] = useState(false);

  return (
    <div className="container">
      <h2 className={st.title}>Подборки</h2>
      <div className={st.filters}>
        <div className={st.filtersBtns}>
          <div className={st.popularSelections}>
            {popularSelections.map(select => (
              <button key={select.id} className={st.selectFilters}>
                {select.option}
              </button>
            ))}
          </div>
          <div className={st.booksSelections}>
            {booksSelections.map(select => (
              <button key={select.id} className={st.selectFilters}>
                {select.option}
              </button>
            ))}
          </div>
        </div>
        <Switcher
          setFlagSwitcher={setFlagSwitcher}
          flagSwitcher={flagSwitcher}
        />
      </div>
      <div className={st.mainBlock}>
        <SelectionsList flagSwitcher={flagSwitcher} audio={audio} />
        {flagSwitcher && <SelectionGrid />}
        <div className={st.advertisingBlok}>
          <div className={st.bannerBlock}>
            <img src="/banner.png" alt="" className={st.banner} />
          </div>
          {!flagSwitcher && (
            <div className={st.bannerBlock}>
              <img src="/banner.png" alt="" className={st.banner} />
            </div>
          )}
        </div>
      </div>
      <p className={st.pagination}>1 2 3 4</p>
    </div>
  );
};

export default SelectionsPage;
