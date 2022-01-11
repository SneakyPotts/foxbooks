import { useState, useRef } from 'react';
// import Image from 'next/image';
import Img from '../../../public/img.svg';
import st from './edit.module.scss';
import classnames from 'classnames';

const Edit = () => {
  const inputFile = useRef();

  const [file64, setFile64] = useState(null);

  const onChange = e => {
    console.log(11111111);
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

  return (
    <div>
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
            <input
              placeholder="Название"
              className={st.changeInput}
              onClick={e => e.stopPropagation()}
            />
            <p className={st.changeInputLabel}>100 символов</p>
          </div>
        </div>
        <input onChange={onChange} ref={inputFile} type="file" hidden />
      </div>
      <div className="container">
        <textarea className={st.replyArea}></textarea>
      </div>
    </div>
  );
};

export default Edit;
