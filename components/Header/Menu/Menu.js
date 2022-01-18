import Link from 'next/link';
import { useRouter } from 'next/router';
import css from './menu.module.css';
import {useSelector} from "react-redux";

const Navigation = () => {
	const router = useRouter();
	const { isAuth } = useSelector(state => state.auth)
	return (
		<nav className={css.navigation}>
			<Link
				href="/books?sortBy=1"
				// href={{
				//   pathname: '/books',
				//   query: {
				//     page: 'Книги',
				//     comingFrom: 'home',
				//   },
				// }}
			>
				<a
					className={`${css.link} ${
						router.pathname.includes('/books') ? css.active : css.link
					}`}
				>
            Книги
				</a>
			</Link>
			<Link
				href="/audiobooks"
				// href={{
				//   pathname: '/audiobooks',
				//   query: {
				//     page: 'Аудиокниги',
				//     comingFrom: 'home',
				//   },
				// }}
			>
				<a
					className={`${css.link} ${
						router.pathname.includes('/audiobooks') ? css.active : css.link
					}`}
				>
            Аудиокниги
				</a>
			</Link>
			<Link
				href="/selections"
				// href={{
				//   pathname: '/selections',
				//   query: {
				//     page: 'Подборки',
				//     comingFrom: 'home',
				//   },
				// }}
			>
				<a
					className={`${css.link} ${
						router.pathname.includes('/selections') ? css.active : css.link
					}`}
				>
            Подборки
				</a>
			</Link>
			<Link
				href="/new"
				// href={{
				//   pathname: '/new',
				//   query: {
				//     page: 'Новинки',
				//     comingFrom: 'home',
				//   },
				// }}
			>
				<a
					className={`${css.link} ${
						router.pathname.includes('/new') ? css.active : css.link
					}`}
				>
            Новинки
				</a>
			</Link>
			{isAuth && 
				<Link
					href="/mybooks"
					// href={{
					//   pathname: '/mybooks',
					//   query: {
					//     page: 'Мои книги',
					//     comingFrom: 'home',
					//   },
					// }}
				>
					<a
						className={`${css.link} ${
							router.pathname == '/mybooks' ? css.active : css.link
						}`}
					>
						Мои книги
					</a>
				</Link>
			}
		</nav>
	);
};
export default Navigation;
