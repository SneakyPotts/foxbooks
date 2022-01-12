import Image from 'next/image';
import Link from 'next/link';
import st from './selectionsGrid.module.scss';

const SelectionGrid = () => {
	const selectionsData = [
		{
			id: '0',
			img: '/horizontalBookCovers/bookCover1.png',
			name: 'Написанное остается: книги о безопасном общении в интерне Написанное остается: книги о безопасном общении в интерне',
			count: '15',
		},
		{
			id: '1',
			img: '/horizontalBookCovers/bookCover2.png',
			name: 'Дружба в книгах',
			count: '15',
		},
		{
			id: '2',
			img: '/horizontalBookCovers/bookCover3.png',
			name: 'Топ осени 2021 года',
			count: '15',
		},
		{
			id: '3',
			img: '/horizontalBookCovers/bookCover1.png',
			name: 'Новинки недели 15-21 ноября',
			count: '15',
		},
		{
			id: '4',
			img: '/horizontalBookCovers/bookCover2.png',
			name: 'Написанное остается: книги о безопасном общении в интерне Написанное остается: книги о безопасном общении в интерне',
			count: '15',
		},
		{
			id: '5',
			img: '/horizontalBookCovers/bookCover3.png',
			name: 'Дружба в книгах',
			count: '15',
		},
		{
			id: '6',
			img: '/horizontalBookCovers/bookCover1.png',
			name: 'Топ осени 2021 года',
			count: '15',
		},
		{
			id: '8',
			img: '/horizontalBookCovers/bookCover2.png',
			name: 'Новинки недели 15-21 ноября',
			count: '15',
		},
		{
			id: '9',
			img: '/horizontalBookCovers/bookCover3.png',
			name: 'Написанное остается: книги о безопасном общении в интерне Написанное остается: книги о безопасном общении в интерне',
			count: '15',
		},
		{
			id: '10',
			img: '/horizontalBookCovers/bookCover1.png',
			name: 'Дружба в книгах',
			count: '15',
		},
		{
			id: '11',
			img: '/horizontalBookCovers/bookCover2.png',
			name: 'Топ осени 2021 года',
			count: '15',
		},
		{
			id: '12',
			img: '/horizontalBookCovers/bookCover3.png',
			name: 'Новинки недели 15-21 ноября',
			count: '15',
		},
		{
			id: '13',
			img: '/horizontalBookCovers/bookCover1.png',
			name: 'Написанное остается: книги о безопасном общении в интерне Написанное остается: книги о безопасном общении в интерне',
			count: '15',
		},
		{
			id: '14',
			img: '/horizontalBookCovers/bookCover2.png',
			name: 'Дружба в книгах',
			count: '15',
		},
		{
			id: '15',
			img: '/horizontalBookCovers/bookCover3.png',
			name: 'Топ осени 2021 года',
			count: '15',
		},
		{
			id: '16',
			img: '/horizontalBookCovers/bookCover1.png',
			name: 'Написанное остается: книги о безопасном общении в интерне Написанное остается: книги о безопасном общении в интерне',
			count: '15',
		},
		{
			id: '17',
			img: '/horizontalBookCovers/bookCover2.png',
			name: 'Дружба в книгах',
			count: '15',
		},
		{
			id: '18',
			img: '/horizontalBookCovers/bookCover3.png',
			name: 'Топ осени 2021 года',
			count: '15',
		},
		{
			id: '19',
			img: '/horizontalBookCovers/bookCover1.png',
			name: 'Написанное остается: книги о безопасном общении в интерне Написанное остается: книги о безопасном общении в интерне',
			count: '15',
		},
		{
			id: '20',
			img: '/horizontalBookCovers/bookCover2.png',
			name: 'Дружба в книгах',
			count: '15',
		},
		{
			id: '21',
			img: '/horizontalBookCovers/bookCover3.png',
			name: 'Топ осени 2021 года',
			count: '15',
		},
		{
			id: '22',
			img: '/horizontalBookCovers/bookCover1.png',
			name: 'Написанное остается: книги о безопасном общении в интерне Написанное остается: книги о безопасном общении в интерне',
			count: '15',
		},
		{
			id: '23',
			img: '/horizontalBookCovers/bookCover2.png',
			name: 'Дружба в книгах',
			count: '15',
		},
		{
			id: '24',
			img: '/horizontalBookCovers/bookCover3.png',
			name: 'Топ осени 2021 года',
			count: '15',
		},
	];

	return (
		<div className={st.selGrid}>
			{selectionsData.map(sel => (
				<div className={st.selGridBlock}>
					<div className={st.selGridCover}>
						<Image src={sel.img} width={231} height={166} alt="" />
						<div className={st.selGridCoverAmount}>
							<span>{sel.count}</span>
							<span>книг</span>
						</div>
					</div>
					<Link href={`/selections/${sel.id}`}>
						<a>
							<h4 className={st.selGridBlockTitle}>{sel.name}</h4>
						</a>
					</Link>
				</div>
			))}
		</div>
	);
};

export default SelectionGrid;
