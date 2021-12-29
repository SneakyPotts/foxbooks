import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Stars from '../shared/common/stars/Stars';
import DropDownArrow from '../../public/chevron-down.svg';
import st from './reviewComponent.module.scss';

const ReviewComponent = ({ it, idx }) => {
  const [showMoreMap, setShowMoreMap] = useState(null);

  const route = useRouter();
  console.log(route.pathname === '/reviews' && '1111');

  const onShowMore = idx => {
    setShowMoreMap(prev => {
      if (prev === idx) {
        return null;
      } else {
        return idx;
      }
    });
  };

  return (
    <div className={st.review}>
      <div className={st.reviewBook}>
        <Image src={it.img} width={129} height={195} />
        <div className={st.reviewBookRaiting}>
          <Stars value={it.raiting} />
          <span>{it.raiting}</span>
        </div>
        <h4 className={st.reviewBookName}>Случайная вакансия</h4>
        <Link href="/author">
          <a>
            <p className={st.reviewBookAuthor}>Джоан Роулинг</p>
          </a>
        </Link>
      </div>
      <div className={st.reviewContent}>
        <div
          className={classnames(st.reviewHead, {
            [st.quotes]: route.pathname === '/quotes',
          })}
        >
          <div className={st.reviewer}>
            <div className={st.reviewerImg}>
              <Image
                src="/horizontalBookCovers/bookCover1.png"
                width={35}
                height={35}
                alt=""
              />
            </div>
            <h3 className={st.reviewerName}>Ник</h3>
          </div>
          <p className={st.reviewDate}>20 октября 2021 в 14:05</p>
          {route.pathname === '/reviews' && (
            <div className={st.reviewRaiting}>
              <p>Оценил книгу</p> <Stars />
            </div>
          )}
        </div>
        {route.pathname === '/reviews' ? (
          <div>
            <h3 className={st.reviewTitle}>
              Гарри получает похвалы за то, что нарушает запреты
            </h3>
            <p
              className={classnames(st.reviewText, {
                [st.reviewTextHide]: showMoreMap !== idx,
              })}
            >
              Почему-то до этого момента у меня возникало к книге намного меньше
              вопросов, хотя я перечитывала её всего пару лет назад. А сразу
              после прочтения седьмой части и по сравнению с ней первая история
              о Мальчике, Который Выжил выглядит сырой, недодуманной и слишком
              детской - но да-да, эта книга изначально была для детей. И это
              впечатление скорее говорит о том, насколько выросла история о
              Гарри Поттере по прошествии лет, как оброс подробностями и жизнью
              магический мир, захвативший так много читателей по всему миру.
              Большинство знают историю о Гарри, частично или полностью, так что
              спойлерить её весьма проблематично, и я тут порассуждаю над
              некоторыми моментами, которые привлекли моё внимание или вызвали
              недоумение в первой книге. О каких-то я уже слышала от других
              людей, другие пришли мне в И это впечатление скорее говорит о том,
              насколько выросла история о Гарри Поттере по прошествии лет, как
              оброс подробностями и жизнью магический мир, захвативший так много
              читателей по всему миру. Большинство знают историю о Гарри,
              частично или полностью, так что спойлерить её весьма
              проблематично, и я тут порассуждаю над некоторыми моментами,
              которые привлекли моё внимание или вызвали недоумение в первой
              книге. О каких-то я уже слышала от других людей, другие пришли мне
              в
            </p>
            <span
              className={classnames(st.showMoreLink)}
              onClick={() => onShowMore(idx)}
            >
              Показать полностью{' '}
              <DropDownArrow
                className={classnames(st.dropDownArrow, {
                  [st.up]: showMoreMap === idx,
                })}
              />
            </span>
          </div>
        ) : (
          <p className={st.reviewText}>
            Одна ложь тянет за собой другую. Солгав один раз, уже нельзя
            остановиться. Всё равно что плыть в дырявой лодке: без конца
            приходится вычерпывать воду, чтобы не утонуть.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
