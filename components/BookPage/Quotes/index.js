import { useSelector } from 'react-redux';
import Image from 'next/image';
import Eye from '../../shared/icons/eye';
import Like from '../../shared/icons/heart';
import MyPagination from '../../shared/common/MyPagination';
import st from './quotes.module.scss';

const Quotes = () => {
  const data = [
    {
      id: '0',
      name: 'Александр Смирнов',
      quote:
        'Для высокоорганизованного разума смерть - это очередное приключение.',
      flag: false,
    },
    {
      id: '1',
      name: 'Ник',
      quote:
        'Нельзя цепляться за мечты и сны, забывая о настоящем, забывая о своей жизни.',
      flag: false,
    },
    {
      id: '2',
      name: 'Екатерина Смирнова',
      quote:
        '-Я не Фред, я Джордж. О, женщина, как ты можешь называться нашей матерью, если не можешь различить собственных сыновей?',
      flag: false,
    },
  ];

  const { innerWidthWindow } = useSelector(state => state.common);

  return (
    <div
      id="quotes"
      className={st.container}
    >
      <h2 className={st.quotesTitle}>Цитаты</h2>
      {data.map(it => (
        <div key={it.id} className={st.quote}>
          <div className={st.user}>
            <div className={st.userIcon}>
              <Image
                src="/horizontalBookCovers/bookCover3.png"
                alt=""
                width="35"
                height="35"
                placeholder="blur"
                blurDataURL="/blur.webp"
              />
            </div>
            <h3 className={st.userName}>{it.name}</h3>
          </div>
          <div className={st.quoteInfo}>
            <span>20 октября 2021 в 14:05</span>
            <span className={st.quoteView}>
              <span className={st.quoteViewCount}>456</span> <Eye />
            </span>
          </div>
          <div className={st.quoteContainer}>
            <p className={st.commentText}>{it.quote}</p>
            <div className={st.quoteStatistic}>
              <span className={st.quoteIcon}>
                <Like />
              </span>
              <span className={st.quoteLike}>10</span>
            </div>
          </div>
        </div>
      ))}
      {innerWidthWindow > 768 ? (
        <MyPagination />
      ) : (
        <div className={st.pagination}>Показать еще</div>
      )}
    </div>
  );
};

export default Quotes;
