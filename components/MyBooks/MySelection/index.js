import { useState } from 'react';
import Button from '../../shared/common/Button/Button';
import Dots from '../../../public/horizontalDots.svg';
import Edit from '../../../public/edit-pencil.svg';
import Bin from '../../../public/trash.svg';
import st from './mySelection.module.scss';

const mySelection = () => {
  const [editMenu, setEditMenu] = useState(false);

  const togle = () => {
    setEditMenu(!editMenu);
  };

  return (
    <div className={st.selectionCover}>
      <h1 className={st.selectionName}>Дизайн</h1>
      <div className={st.selectionBtns}>
        <Button text="Добавить книгу" />
        <div className={st.selectionBtnsDots} onClick={togle}>
          <Dots />
          {editMenu && (
            <div className={st.editMenu}>
              <p className={st.editMenuOption}>
                <Edit />{' '}
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
  );
};

export default mySelection;
