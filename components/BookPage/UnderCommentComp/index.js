import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import Like from '../../shared/icons/heart';
import ArrowRight from '../../../public/chevron-right.svg';
import Button from '../../shared/common/Button/Button';

import st from './underCom.module.scss';

const UnderCom = ({ showReplys, setShowReplys, data }) => {
  const [replyIdx, setReplyIdx] = useState(null);
  const [underComIdx, setUnderComIdx] = useState(null);

  const replyToComment = index => {
    setReplyIdx(prev => {
      if (prev === index) {
        return null;
      } else {
        return index;
      }
    });
  };

  const addUnderComment = idx => {
    setUnderComIdx(prev => {
      if (prev === idx) {
        return null;
      } else {
        return idx;
      }
    });
  };

  const handleOnShowReplys = index => {
    setShowReplys(prev => {
      const showReplaysMap = prev.map(({ flag, ...rest }, i) => {
        return {
          flag: index === i ? !flag : flag,
          ...rest,
        };
      });
      return showReplaysMap;
    });
  };

  const handleCancelBtn = () => {
    setReplyIdx(null);
    setUnderComIdx(null);
  };

  return (
    <div>
      {showReplys.map(({ id, flag }, index) => (
        <div key={id} className={classnames(st.reviewComment)}>
          <div>
            <div className={st.reviewer}>
              <div className={st.reviewerIcon}>
                <Image
                  src="/horizontalBookCovers/bookCover1.png"
                  alt=""
                  width="35"
                  height="35"
                  // placeholder="blur"
                  blurDataURL="/images/blur.jpg"
                />
              </div>
              <div className={st.commentator}>
                <h3 className={st.reviewerName}>Марина Цветкова</h3>
                <span className={st.commentDate}>3 часа назад</span>
              </div>
            </div>
            <div>
              <div className={st.commentContainer}>
                <p className={st.commentText}>
                  Для меня М. Коннелли - лучший автор современного детектива. В
                  его романах частная история преступления раскрывается в тесной
                  взаимосвязи с глобальной историей человечества. Это всегда
                  ярко, этично и талантливо.
                </p>
                <div className={st.reviewStatistic}>
                  <span className={st.reviewIcon}>
                    <Like />
                  </span>
                  <span className={st.reviewLike}>10</span>
                  <button
                    className={st.reply}
                    onClick={() => replyToComment(index)}
                  >
                    Ответить
                  </button>
                </div>
              </div>

              {replyIdx === index && (
                <div>
                  <div className={st.replyDirection}>
                    <div className={st.replierIcon}>
                      <Image
                        src="/horizontalBookCovers/book.png"
                        alt=""
                        width="25"
                        height="25"
                        // placeholder="blur"
                        blurDataURL="/images/blur.jpg"
                      />
                    </div>
                    <textarea className={st.replyArea}></textarea>
                  </div>
                  <div className={st.controllBtn}>
                    <Button
                      typeButton="submit"
                      text="Отправить"
                      classNames={st.submitButton}
                    />
                    <button className={st.cancelBtn} onClick={handleCancelBtn}>
                      Отменить
                    </button>
                  </div>
                </div>
              )}
            </div>
            <span
              onClick={() => handleOnShowReplys(index)}
              className={st.showReplysLink}
            >
              {!flag ? (
                <span>Показать 5 ответов</span>
              ) : (
                <span>Скрыть 5 ответов</span>
              )}
              <ArrowRight
                className={classnames(st.showReplysBtn, {
                  [st.down]: flag,
                })}
              />
            </span>
          </div>
          {flag && (
            <div>
              {data.map(({ id }, idx) => (
                <div key={id} className={classnames(st.reviewBlock, st.sizes)}>
                  <div className={st.reviewer}>
                    <div className={st.reviewerIcon}>
                      <Image
                        src="/horizontalBookCovers/bookCover1.png"
                        alt=""
                        width="35"
                        height="35"
                        // placeholder="blur"
                        blurDataURL="/images/blur.jpg"
                      />
                    </div>
                    <div className={st.commentator}>
                      <h3 className={st.reviewerName}>Светлана Смирнова</h3>
                      <span className={st.commentDate}>3 часа назад</span>
                    </div>
                  </div>
                  <div className={st.commentContainer}>
                    <p className={st.commentText}>
                      Марина, постоянный количественный рост и сфера нашей
                      активности требует от нас анализа анализа существующих
                      паттернов поведения.
                    </p>
                    <div className={st.reviewStatistic}>
                      <span className={st.reviewIcon}>
                        <Like />
                      </span>
                      <span className={st.reviewLike}>10</span>
                      <span
                        className={st.reply}
                        onClick={() => addUnderComment(idx)}
                      >
                        Ответить
                      </span>
                    </div>
                  </div>
                  {underComIdx === idx && (
                    <div>
                      <div className={st.replyDirection}>
                        <div className={st.replierIcon}>
                          <Image
                            src="/horizontalBookCovers/book.png"
                            alt=""
                            width="25"
                            height="25"
                            // placeholder="blur"
                            blurDataURL="/images/blur.jpg"
                          />
                        </div>
                        <textarea className={st.replyArea}></textarea>
                      </div>
                      <div className={st.controllBtn}>
                        <Button
                          typeButton="submit"
                          text="Отправить"
                          classNames={st.submitButton}
                        />
                        <button
                          className={st.cancelBtn}
                          onClick={handleCancelBtn}
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UnderCom;
