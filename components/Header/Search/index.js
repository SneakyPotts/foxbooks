import React, {useMemo} from 'react';
import st from './../header.module.scss'
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";
import ShowAll from "../../shared/common/showAll/ShowAll";

const booksMock = [
  {
    id: '0',
    image: {
      link: '/reviewsBookCovers/cover1.png'
    },
    title: 'Пост 2. Спастись и сохранить',
  },
  {
    id: '1',
    image: {
      link: '/reviewsBookCovers/cover2.png'
    },
    title: 'Девочка в нулевой степени',
  },
  {
    id: '2',
    image: {
      link: '/reviewsBookCovers/cover3.png'
    },
    title: 'Предружба. Второй шанс',
  },
  {
    id: '3',
    image: {
      link: '/reviewsBookCovers/cover1.png'
    },
    title: 'Четыре ветра',
  },
  {
    id: '4',
    image: {
      link: '/reviewsBookCovers/cover2.png'
    },
    title: 'Последний ход',
  },
  {
    id: '5',
    image: {
      link: '/reviewsBookCovers/cover3.png'
    },
    name: 'Лето в пионерском галстуке',
  },
];
const authorsMock = [
  {id: '0', author: 'Михаил Булгаков'},
  {id: '1', author: 'Стивен Кинг'},
  {id: '2', author: 'Эрих Мария Ремарк'},
  {id: '3', author: 'Фёдор Достоевский'},
  {id: '4', author: 'Оскар Уайльд'},
  {id: '5', author: 'Рэй Брэдбери'},
  {id: '6', author: 'Джоан Роулинг'},
  {id: '7', author: 'Дэниел Киз'},
  {id: '8', author: 'Джордж Оруэлл'},
  {id: '9', author: 'Антуан де Сент-Экзюпери'},
];

const Search = ({ value , onClose }) => {
  const { data } = useSelector(state => state.search)

  const books = useMemo(() => {
    return data?.books || booksMock
  }, [data])

  const authors = useMemo(() => {
    return data?.authors || authorsMock
  }, [data])

  return (
    <div className={st.overlay} onClick={onClose}>
      <div
        className={classNames(st.dropDown)}
        onClick={e => e.stopPropagation()}
      >
        <div className={classNames('container', st.border)}>
          <div className={st.dropDownContent}>
                  <ShowAll
                    text={'Все результаты'}
                    url={`/search?search=${encodeURI(value)}&type=full`}
                    arrowSecondary
                  />
            {!!books?.length &&
              <div className={st.dropDownContentUser}>
                {/*{!!data?.books?.length ?*/}
                  {/*<h2 className={st.dropDownContentTitle}>Часто ищут</h2>*/}
                }
                <ul className={st.dropDownContentPopular}>
                  {books.map(i => (
                    <li
                      key={i?.id}
                      className={st.dropDownContentPopularItem}
                    >
                      <Image
                        src={i?.image?.link || '/blur.webp'}
                        width={124}
                        height={187}
                        // layout="fill"
                        placeholder="blur"
                        blurDataURL="/blur.webp"
                      />
                      <span className={st.dropDownContentPopularItemName}>
                        {i?.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            }
            {!!authors?.length &&
              <div className={st.dropDownContentAuthor}>
                <h2 className={st.dropDownContentTitle}>Авторы</h2>
                <ul className={st.authorsList}>
                  {authors.map(({id, author}) => (
                    <Link href="#" key={id} className={st.author}>
                      <a>
                        <span className={st.authorName}>{author}</span>
                      </a>
                    </Link>
                  ))}
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;