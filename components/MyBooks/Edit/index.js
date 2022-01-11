import { useState, useRef } from 'react';
import Image from 'next/image';
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
          <input placeholder="Название" />
        </div>
      </div>
      <input onChange={onChange} ref={inputFile} type="file" hidden />
    </div>
  );
};

export default Edit;
