import React, {useEffect, useState} from 'react';
import s from './styles.module.scss';
import BackText from "../../shared/common/BackText";
import classNames from "classnames";
import Button from "../../shared/common/Button/Button";
import CreateCompilationPopup from "../../CreateCompilationPopup";
import SelectionService from "../../../http/SelectionService";
import Loader from "../../shared/common/Loader";
import CompilationItem from "../../CompilationItem";
import BackBtn from "../../shared/common/BackBtn";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getUserCompilations} from "../../../store/selectionSlice";

const AddToMyCompilation = ({ onClose }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [createPopupIsVisible, setCreatePopupIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [alreadyAdded, setAlreadyAdded] = useState(null);
  const {data} = useSelector(state => state.selection.userCompilations)

  const handleClick = async id => {
    await SelectionService.addBookToCompilation({
      compilation_id: id,
      book_id: router.query?.id,
      book_type: router.query?.type
    })
      .then(() => onClose())
      .catch(() => setAlreadyAdded(id))
  }

  useEffect(() => {
    const queryParam = {
      sortBy: '1',
      compType:'1'
    }
    dispatch(getUserCompilations(queryParam))
      .then(() => setIsLoading(false))
  }, [])

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

      {isLoading ?
        <div className={classNames("empty", s.empty)}>
          <Loader/>
        </div> :
        data?.length ?
          <div className={s.wrapper}>
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
          </div> :
          <p className={classNames("empty", s.empty)}>У вас нет подборок</p>
      }

      {createPopupIsVisible &&
        <CreateCompilationPopup
          onClose={() => setCreatePopupIsVisible(false)}
        />
      }
    </div>
  );
};

export default AddToMyCompilation;