import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import CommentComp from '../CommentComponent';
import Button from '../../shared/common/Button/Button';
import Like from '../../shared/icons/heart';
import ArrowRight from '../../../public/chevron-right.svg';
import Pagination from '../Pagination';
import st from './comments.module.scss';

const Comments = () => {
  const [replyIdx, setReplyIdx] = useState(null);
  const [underComIdx, setUnderComIdx] = useState(null);
  const [showReplys, setShowReplys] = useState([
    { id: '0', flag: false },
    { id: '1', flag: false },
    { id: '2', flag: false },
  ]);
  // const [showInput, setShowInput] = useState(false);
  const [inputIdx, setInputIdx] = useState(null);
  const [firstInput, setFirstInput] = useState(false);
  const [mainCommentIdx, setMainCommenIdx] = useState(null);

  const data = [
    { id: '0', flag: false },
    { id: '1', flag: false },
    { id: '2', flag: false },
  ];

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

  const handleFirstInput = () => {
    setFirstInput(true);
  };
  const handleInputMap = idx => {
    setInputIdx(idx);
  };

  const handleCancelBtn = () => {
    setInputIdx(null);
    setFirstInput(null);
    setMainCommenIdx(null);
    setReplyIdx(null);
    setUnderComIdx(null);
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

  return (
    <div className={st.test}>
      <h2 id="reviews" className={st.reviewsTitle}>
        Оставьте свой комментарий
      </h2>
      <form className={st.user}>
        <div className={st.userFormHeader}>
          <div className={st.userIcon}>
            <Image
              src="/horizontalBookCovers/book.png"
              alt=""
              width="35"
              height="35"
              // placeholder="blur"
              blurDataURL="/images/blur.jpg"
            />
          </div>
          <input
            placeholder="Написать комментарий"
            className={st.userInput}
            onClick={handleFirstInput}
          />
        </div>
        <div className={st.userComment}>
          {firstInput && (
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
          )}
        </div>
      </form>
      {data.map(({ id }, idx) => (
        <>
          <div key={id} className={st.reviewBlock}>
            <CommentComp idx={idx} setMainCommenIdx={setMainCommenIdx} />
            {mainCommentIdx === idx && (
              <form className={st.userForm}>
                <div className={st.userFormHeader}>
                  <div className={st.userIcon}>
                    <Image
                      src="/horizontalBookCovers/book.png"
                      alt=""
                      width="35"
                      height="35"
                      // placeholder="blur"
                      blurDataURL="/images/blur.jpg"
                    />
                  </div>
                  <input
                    placeholder="Написать комментарий"
                    className={st.userInput}
                    onClick={() => {
                      handleInputMap(idx);
                    }}
                  />
                </div>
                <div className={st.userComment}>
                  {inputIdx === idx && (
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
                  )}
                </div>
              </form>
            )}
          </div>

          <>
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
                        Для меня М. Коннелли - лучший автор современного
                        детектива. В его романах частная история преступления
                        раскрывается в тесной взаимосвязи с глобальной историей
                        человечества. Это всегда ярко, этично и талантливо.
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
                      <div
                        key={id}
                        className={classnames(st.reviewBlock, st.sizes)}
                      >
                        {' '}
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
                            <h3 className={st.reviewerName}>
                              Светлана Смирнова
                            </h3>
                            <span className={st.commentDate}>3 часа назад</span>
                          </div>
                        </div>
                        <div className={st.commentContainer}>
                          <p className={st.commentText}>
                            Марина, постоянный количественный рост и сфера нашей
                            активности требует от нас анализа анализа
                            существующих паттернов поведения.
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
                              <div className={st.userIconUnderCom}>
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
            <Link href="#">
              <a>
                <h3 className={st.showNextComments}>
                  Показать следующие комментарии
                </h3>
              </a>
            </Link>
          </>
        </>
      ))}

      <Pagination />
    </div>
  );
};

export default Comments;
