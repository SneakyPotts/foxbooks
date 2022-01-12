import { useState, useRef } from 'react';
import Image from 'next/image';
import st from './edit.module.scss';
import classnames from 'classnames';
import Img from '../../../public/img.svg';
import Button from '../../shared/common/Button/Button';
import Close from '../../../public/close.svg';
import st from './edit.module.scss';

const Edit = ({ setEditPage, setAddBookPage }) => {
  const inputFile = useRef();

  const [file64, setFile64] = useState(null);

  const onChange = e => {
    let reader = new FileReader();
    const files = e.target.files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setFile64(reader.result);
    };
  };

  const HandleClick = () => {
    inputFile.current.click();
  };

  const closeEditPage = e => {
    e.stopPropagation();
    setEditPage(false);
    const body = document.querySelector('body');
    body.classList.remove('nonScroll');
  };

  const onSubmitBtnClick = () => {
    setEditPage(false);
    setAddBookPage(true);
    const body = document.querySelector('body');
    body.classList.remove('nonScroll');
  };

  const inputChange = e => {
    e.stopPropagation();
  };

  return (
    <form>
      <div className={st.container}>
        <div className={st.dropblock} onClick={HandleClick}>
          <div
            className={classnames(st.dropblockImage, {
              [st.dropblockImageActive]: file64,
            })}
            style={
              file64 && {
                backgroundImage: `url(${file64})`,
              }
            }
          >
            <div className={st.wrapper}>
              {!file64 && <Img className={st.imgSvg} />}
              <Close className={st.closeSvg} onClick={e => closeEditPage(e)} />
              <input
                placeholder="Название"
                maxLength={100}
                className={st.changeInput}
                onClick={e => inputChange(e)}
              />
              <p className={st.changeInputLabel}>100 символов</p>
            </div>
          </div>
          <input onChange={onChange} ref={inputFile} type="file" hidden />
        </div>
        <div className="container">
          <div className={st.textArea}>
            <p className={st.textAreaLabel}>Опишите, о чем эта подборка</p>
            <textarea className={st.textAreaInput}></textarea>
            <Button
              text="Создать подборку"
              typeButton="submit"
              click={onSubmitBtnClick}
            />
            <p className={st.textAreaBtnLabel}>и перейти к добавлению книг</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Edit;
