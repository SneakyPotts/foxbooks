import Link from 'next/link';
import ArrowRight from '../../../../public/chevron-right.svg'
import css from '../AudioBooks/audioBooks.module.css'
const Compilations = () => {
    return <div className={css.container}>
        <h2 className={css.title}>Подборки</h2>
        <Link href="/compilations">
              <a  className={css.newLink}>
                Смотреть все <ArrowRight />
              </a>
            </Link></div>
    
}
export default Compilations