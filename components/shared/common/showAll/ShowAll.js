import Link from 'next/link';
import st from './showAll.module.scss';
import ArrowRight from '../../../../public/chevron-right.svg';

const ShowAll = ({ text = 'Смотреть все', title, url = '/' }) => {
	return (
		<div className={st.showAll}>
			{title && <h3 className={st.showAllTitle}>{title}</h3>}
			<Link href={url}>
				<a className={st.showAllLink}>
					{text}
					<ArrowRight />
				</a>
			</Link>
		</div>
	);
};
export default ShowAll;
