import Link from 'next/link';
import ArrowRight from '../../../../public/chevron-right.svg'
import css from './audioBooks.module.scss'

const AudioBooks = () => {
    return <div className={css.container}>
        <h2 className={css.title}>Некогда читать - слушайте!</h2>
        <Link href="/audioBooks">
              <a className={css.newLink}>
                Смотреть все <ArrowRight className={css.arrowRight}/>
              </a>
            </Link>
    </div>
}
export default AudioBooks