import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import Eye from '../../shared/icons/eye';
import DropDownArrow from '../../../public/chevron-down.svg';
import Like from '../../shared/icons/heart';
import Comment from '../../shared/icons/comment';
import ArrowRight from '../../../public/chevron-right.svg';

import st from './reviews.module.scss';

const Reviews = () => {
  const [showMore, setShowMore] = useState(false);
  const [reply, setReply] = useState(false);
  const [showReplys, setShowReplys] = useState([
    { id: '0', flag: false },
    { id: '1', flag: false },
    { id: '2', flag: false },
  ]);
  const [reviewTyping, setReviewTyping] = useState(false);

  const data = [
    { id: '0', flag: false },
    { id: '1', flag: false },
    { id: '2', flag: false },
  ];

  const onShowMore = () => {
    setShowMore(!showMore);
  };

  const replyToComment = () => {
    setReply(!reply);
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

  const handleLeaveReviewInput = () => {
    setReviewTyping(true);
  };

  const handleChangeReviewField = e => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className={st.test}>
      <h2 id="reviews" className={st.reviewsTitle}>
        Рецензии
      </h2>

      <div className={st.reviewBlock}>
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
          <h3 className={st.reviewerName}>Ник</h3>
        </div>
        <div className={st.reviewInfo}>
          <span className={st.reviewDate}>20 октября 2021 в 14:05</span>
          <span className={st.reviewView}>
            <span className={st.reviewViewCount}>456</span> <Eye />
          </span>
        </div>
        <h3 className={st.reviewTitle}>
          Гарри получает похвалы за то, что нарушает запреты
        </h3>
        <div>
          <p
            className={classnames(st.reviewText, {
              [st.reviewTextHide]: !showMore,
            })}
          >
            Почему-то до этого момента у меня возникало к книге намного меньше
            вопросов, хотя я перечитывала её всего пару лет назад. А сразу после
            прочтения седьмой части и по сравнению с ней первая история о
            Мальчике, Который Выжил выглядит сырой, недодуманной и слишком
            детской - но да-да, эта книга изначально была для детей. И это
            впечатление скорее говорит о том, насколько выросла история о Гарри
            Поттере по прошествии лет, как оброс подробностями и жизнью
            магический мир, захвативший так много читателей по всему миру.
            Большинство знают историю о Гарри, частично или полностью, так что
            спойлерить её весьма проблематично, и я тут порассуждаю над
            некоторыми моментами, которые привлекли моё внимание или вызвали
            недоумение в первой книге. О каких-то я уже слышала от других людей,
            другие пришли мне Почему-то до этого момента у меня возникало к
            книге намного меньше вопросов, хотя я перечитывала её всего пару лет
            назад. А сразу после прочтения седьмой части и по сравнению с ней
            первая история о Мальчике, Который Выжил выглядит сырой,
            недодуманной и слишком детской - но да-да, эта книга изначально была
            для детей. И это впечатление скорее говорит о том, насколько выросла
            история о Гарри Поттере по прошествии лет, как оброс подробностями и
            жизнью магический мир, захвативший так много читателей по всему
            миру. Большинство знают историю о Гарри, частично или полностью, так
            что спойлерить её весьма проблематично, и я тут порассуждаю над
            некоторыми моментами, которые привлекли моё внимание или вызвали
            недоумение в первой книге. О каких-то я уже слышала от других людей,
            другие пришли мне
          </p>
          <span className={classnames(st.showMoreLink)} onClick={onShowMore}>
            Показать полностью{' '}
            <DropDownArrow
              className={classnames(st.dropDownArrow, {
                [st.up]: showMore,
              })}
            />
          </span>
          <div className={st.reviewStatistic}>
            <span className={st.reviewIcon}>
              <Like />
            </span>
            <span className={st.reviewLike}>3115</span>
            <span className={st.reviewIcon}>
              <Comment />
            </span>
            <span>700</span>
          </div>
        </div>
      </div>

      {showReplys.map(({ id, flag }, index) => (
        <div key={id}>
          <div className={classnames(st.reviewBlock, st.reviewMainBlock)}>
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
                  <span className={st.reply} onClick={replyToComment}>
                    Ответить
                  </span>
                </div>
              </div>
              {reply && (
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
                    <button className={st.replyBtn}>Отправить</button>
                    <span className={st.cancelBtn}>Отменить</span>
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
              {data.map(({ id }) => (
                <div key={id} className={classnames(st.reviewBlock, st.sizes)}>
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
                      <span className={st.reply} onClick={replyToComment}>
                        Ответить
                      </span>
                    </div>
                  </div>
                  {reply && (
                    <div>
                      <div className={st.replyDirection}>
                        <div className={st.userIcon}>
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
                        <button className={st.replyBtn}>Отправить</button>
                        <span className={st.cancelBtn}>Отменить</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <h3 className={st.showNextComments}>Показать следующие комментарии</h3>
      <div className={st.user}>
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
        <input placeholder="Написать комментарий" className={st.userInput} />
      </div>
      <div className={classnames(st.reviewBlock, st.nonComment)}>
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
          <span className={st.reviewerName}>Ник</span>
        </div>
        <div className={st.reviewInfo}>
          <span className={st.reviewDate}>20 октября 2021 в 14:05</span>
          <span className={st.reviewView}>
            <span className={st.reviewViewCount}>456</span> <Eye />
          </span>
        </div>
        <h3 className={st.reviewTitle}>
          Гарри получает похвалы за то, что нарушает запреты
        </h3>
        <div>
          <p
            className={classnames(st.reviewText, {
              [st.reviewTextHide]: !showMore,
            })}
          >
            Почему-то до этого момента у меня возникало к книге намного меньше
            вопросов, хотя я перечитывала её всего пару лет назад. А сразу после
            прочтения седьмой части и по сравнению с ней первая история о
            Мальчике, Который Выжил выглядит сырой, недодуманной и слишком
            детской - но да-да, эта книга изначально была для детей. И это
            впечатление скорее говорит о том, насколько выросла история о Гарри
            Поттере по прошествии лет, как оброс подробностями и жизнью
            магический мир, захвативший так много читателей по всему миру.
            Большинство знают историю о Гарри, частично или полностью, так что
            спойлерить её весьма проблематично, и я тут порассуждаю над
            некоторыми моментами, которые привлекли моё внимание или вызвали
            недоумение в первой книге. О каких-то я уже слышала от других людей,
            другие пришли мне Почему-то до этого момента у меня возникало к
            книге намного меньше вопросов, хотя я перечитывала её всего пару лет
            назад. А сразу после прочтения седьмой части и по сравнению с ней
            первая история о Мальчике, Который Выжил выглядит сырой,
            недодуманной и слишком детской - но да-да, эта книга изначально была
            для детей. И это впечатление скорее говорит о том, насколько выросла
            история о Гарри Поттере по прошествии лет, как оброс подробностями и
            жизнью магический мир, захвативший так много читателей по всему
            миру. Большинство знают историю о Гарри, частично или полностью, так
            что спойлерить её весьма проблематично, и я тут порассуждаю над
            некоторыми моментами, которые привлекли моё внимание или вызвали
            недоумение в первой книге. О каких-то я уже слышала от других людей,
            другие пришли мне
          </p>
          <span className={classnames(st.showMoreLink)} onClick={onShowMore}>
            Показать полностью{' '}
            <DropDownArrow
              className={classnames(st.dropDownArrow, {
                [st.up]: showMore,
              })}
            />
          </span>
          <div className={st.reviewStatistic}>
            <span className={st.reviewIcon}>
              <Like />
            </span>
            <span className={st.reviewLike}>3115</span>
            <span className={st.reviewIcon}>
              <Comment />
            </span>
            <span>700</span>
          </div>
        </div>
      </div>
      <h3 className={st.leaveReviewTitle}>Оставьте свою рецензию!</h3>
      {reviewTyping && (
        <p className={st.leaveReviewInputLabel}>
          Если бы ваша рецензия ограничивалась одной фразой, что бы вы сказали?
        </p>
      )}
      <input
        placeholder="Текст вашей рецензии..."
        onClick={handleLeaveReviewInput}
        className={st.leaveReviewInput}
      />
      {reviewTyping && (
        <div>
          <p className={st.leaveReviewFieldLabel}>Ваша рецензия</p>
          <textarea
            className={st.leaveReviewField}
            onChange={handleChangeReviewField}
          ></textarea>
          <div
            className={classnames(st.controllBtn, st.controllBtnsLeaveReview)}
          >
            <button className={st.replyBtn}>Отправить</button>
            <span className={st.cancelBtn}>Отменить</span>
          </div>
        </div>
      )}
      <p className={st.pagination}>1 2 3 4 </p>
    </div>
  );
};

export default Reviews;
