import Book from '../../book';
import SideFilters from '../../SideFilters';
import st from './category.module.scss';

const Category = () => {
  const books = [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
    { id: '11' },
    { id: '12' },
    { id: '13' },
    { id: '14' },
    { id: '15' },
    { id: '16' },
    { id: '17' },
    { id: '18' },
    { id: '19' },
    { id: '20' },
    { id: '21' },
    { id: '22' },
    { id: '23' },
    { id: '24' },
    { id: '25' },
    { id: '26' },
    { id: '27' },
    { id: '28' },
    { id: '29' },
    { id: '30' },
    { id: '31' },
    { id: '32' },
    { id: '33' },
    { id: '34' },
    { id: '35' },
    { id: '36' },
    { id: '37' },
    { id: '38' },
    { id: '39' },
    { id: '40' },
    { id: '41' },
    { id: '42' },
    { id: '43' },
    { id: '44' },
    { id: '45' },
    { id: '46' },
    { id: '47' },
  ];

  return (
    <div className="container">
      <h2 className={st.title}>Category</h2>
      <div className={st.mainBlock}>
        <div>
          <SideFilters />
        </div>
        <div className={st.booksGrid}>
          {books.map(book => (
            <Book key={book.id} audio={true} className={st.book} />
          ))}
        </div>
        <div className={st.advertisingBlok}>
          <div className={st.bannerBlock}>
            <img src="/banner.png" alt="" className={st.banner} />
          </div>
          <div className={st.bannerBlock}>
            <img src="/banner.png" alt="" className={st.banner} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
