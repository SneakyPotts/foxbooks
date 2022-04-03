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

const AddToMyCompilation = ({ onClose }) => {
  const router = useRouter()

  const [createPopupIsVisible, setCreatePopupIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const handleClick = async id => {
    await SelectionService.addBookToCompilation({
      compilation_id: id,
      book_id: router.query?.id,
      book_type: router.query?.type
    })
    onClose()
  }

  useEffect(() => {
    (async () => {
      const response = await SelectionService.getUserCompilations({
        sortBy: '1',
        compType:'1'
      })
      setData(response.data.data.data)
      setIsLoading(false)
    })()
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
        <p className={classNames("empty", s.empty)}>
          <Loader/>
        </p> :
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