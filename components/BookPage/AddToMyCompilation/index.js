import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {setUserCompilations} from "../../../store/selectionSlice";
import BackText from "../../shared/common/BackText";
import CreateCompilationPopup from "../../CreateCompilationPopup";
import Loader from "../../shared/common/Loader";
import CompilationItem from "../../CompilationItem";
import BackBtn from "../../shared/common/BackBtn";
import SelectionService from "../../../http/SelectionService";
import Button from "../../shared/common/Button/Button";
import ShowAll from "../../shared/common/showAll/ShowAll";
import s from './styles.module.scss';
import styles from "../../MyBooks/styles.module.scss";

const AddToMyCompilation = ({onClose}) => {
  const dispatch = useDispatch()

  const data = useSelector(state => state.selection.userCompilations);
  const { id: bookId, type: bookType } = useSelector(state => state.book.book)

  const [createPopupIsVisible, setCreatePopupIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [alreadyAdded, setAlreadyAdded] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const handleClick = async id => {
    await SelectionService.addBookToCompilation({
      compilation_id: id,
      book_id: bookId,
      book_type: bookType
    })
      .then(() => onClose())
      .catch(() => setAlreadyAdded(id))
  }

  useEffect(() => {
    if (page === 1) {
      SelectionService.getUserCompilations({compType: 1, sortBy: 1})
        .then((response) => {
          dispatch(setUserCompilations([...response.data.data.data]));
          setLastPage(response.data.data.last_page)
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      SelectionService.getUserCompilations({compType: 1, sortBy: 1, page})
        .then((response) => {
          dispatch(setUserCompilations([...data, ...response.data.data.data]));
          setIsLoading(false);
        });
    }
  }, [page]);

  return (
    <div className={classNames("container", s.container)}>
      <BackText
        onClick={onClose}
        externalClass={s.descBack}
      />

      <BackBtn
        onClick={onClose}
        externalClass={s.mobBack}
      />

      <h2 className={classNames("title", s.title)}>Выберите подборку, в которую хотите добавить книгу</h2>
      <Button
        text={'Создать новую подборку'}
        click={() => setCreatePopupIsVisible(true)}
      />

      {data?.length
        ? <div className={s.wrapper}>
          {data.map(i =>
            <div
              className={s.item}
              onClick={() => handleClick(i?.id)}
            >
              <CompilationItem
                key={i?.id}
                data={i}
              />
              {alreadyAdded === i?.id
                ? <p className={s.error}>Книга уже добавлена в данную подборку</p>
                : null}
            </div>
          )}
        </div>
        : <p className={classNames("empty", s.empty)}>У вас нет подборок</p>
      }

      {isLoading
        ? <div className={classNames("empty", s.empty)}>
          <Loader/>
        </div>
        : null}

      {lastPage > 1 && page !== lastPage
        ? <ShowAll
          text={'Показать ещё'}
          externalClass={styles.onlyDesctop}
          arrowSecondary
          showMore={true}
          setPage={setPage}
        />
        : null}

      {createPopupIsVisible &&
        <CreateCompilationPopup
          onClose={() => setCreatePopupIsVisible(false)}
        />
      }
    </div>
  );
};

export default AddToMyCompilation;
