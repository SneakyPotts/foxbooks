import { useState } from 'react';

import DropDownArrow from '../../../public/chevron-down.svg';
import classnames from 'classnames';

import css from './about.module.scss';

const About = ({ data }) => {
  return (
    <div className={css.container}>
      {data.map(({ title, content }, index) => (
        <AboutItem
          key={`${index}${title}`}
          title={title}
          text={content}
          showStatus={index === 0}
        />
      ))}
    </div>
  );
};
export default About;

const AboutItem = ({ title, text, showStatus = false }) => {
  const [show, setShow] = useState(showStatus);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div
      className={classnames(css.dropDown, {
        [css.active]: show,
      })}
    >
      <button
        onClick={handleClick}
        className={css.dropDownBtn}
      >
        <h2 className={css.dropDownTitle}>{title}</h2>
        <span
          className={classnames(css.dropDownIcon, {
            [css.activeBtn]: show,
          })}
        >
          <DropDownArrow />
        </span>
      </button>
      {show && (
        <div
          className={css.dropDownText}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </div>
  );
};
