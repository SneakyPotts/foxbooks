import React, {useState} from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import ShowAll from '../shared/common/showAll/ShowAll';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import BooksMainBlock from '../shared/common/booksMainBlock/BooksMainBlock';
import Breadcrumbs from '../BreadCrumps/BreadCrumps';
import st from './books.module.scss';
import c from '././../data/categories.json'
import Grid from "../shared/icons/navMenu/grid";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import Button from "../shared/common/Button/Button";
import MobileFilterModal from "../MobileFilterModal";

const Books = () => {
  const router = useRouter();
  const type = router.query?.type

  const [catsIsVisible, setCatsIsVisible] = useState(false)

  const { categories } = useSelector(state => state.book);
  const { innerWidthWindow } = useSelector(state => state.common);

  const cats = c || categories?.slice(0, 13)

  return (
    <div className={classnames('container', st.abContainer)}>
      <Breadcrumbs
        data={[{
          path: `/books?type=${type}&sortBy=1`,
          title: type === 'books' ? 'Книги' : 'Аудиокниги'
        }]}
      />

      <h2 className={st.abTitle}>{type === 'books' ? 'Книги' : 'Аудиокниги'}</h2>

      <div className={st.mobWrapper}>
        {innerWidthWindow > 768 &&
          <>
            {cats?.map(i => (
              <span key={i?.id} className={st.abCateg}>
                <Link href={`/books/${i?.id}?type=${type}&showType=block&sortBy=1`}>
                  <a className={st.abCategLink}>
                    {i?.name}
                  </a>
                </Link>
              </span>
            ))}
            <ShowAll url="/categories" text="Показать все"/>
            <BookFilters/>
          </>
        }

        {innerWidthWindow <= 768 &&
          <>
            <div
              className={st.mobCateg}
              onClick={() => setCatsIsVisible(true)}
            >
              Категории
              <span>
                <Grid />
              </span>
            </div>

            <MobileFilterModal
              // onClear={}
            >
              <BookFilters onModal />
            </MobileFilterModal>
          </>
        }
      </div>

      <BooksMainBlock audio={router.query?.type === 'audioBooks'} />

      {(innerWidthWindow <= 768 && catsIsVisible) &&
        <ModalWindow
          onClose={() => setCatsIsVisible(false)}
          isFullScreen
        >
          <h2 className={classnames(st.abTitle, st.modalTitle)}>Категории</h2>
          <ul className={st.mobCategList}>
            {cats?.map(cat => (
              <li
                key={cat?.id}
                className={st.mobCategListItem}
              >
                <Link href={`/books/${cat.id}?type=${type}&showType=block&sortBy=1`}>
                  <a className={st.mobCategLink}>
                    {cat?.name}
                    <span>{cat?.books_count}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="modalMobileWrapper">
            <Button
              text={'Посмотреть'}
              click={() => router.push('/categories')}
              classNames="modalMobileBtn"
            />
          </div>
        </ModalWindow>
      }
    </div>
  )
}

export default Books