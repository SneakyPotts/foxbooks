import Link from 'next/link';
import ArrowRight from '../../../../public/chevron-right.svg'
import css from '../AudioBooks/audioBooks.module.css'

const Reviews = () => {
  return <div className={css.containerReviews}>
        <h2 className={css.title}>Рецензии</h2>
        <Link href="/reviews">
              <a className={css.newLink}>
                Смотреть все <ArrowRight />
              </a>
        </Link>
      </div>
    
}
export default Reviews