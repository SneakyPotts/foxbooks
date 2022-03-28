import React, {useMemo} from 'react';
import Switcher from '../switcher/Switcher';
import classNames from 'classnames';
import styles from './selections.module.scss';
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import Breadcrumbs from "../BreadCrumps/BreadCrumps";
import BookFilters from "../shared/common/booksFilters/BookFilters";
import MobileFilterModal from "../MobileFilterModal";
import MyPagination from "../shared/common/MyPagination";
import CompilationItem from "../CompilationItem";
import Link from 'next/link'
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowRight from '../../public/chevron-right.svg';
import Button from "../shared/common/Button/Button";
import ShowAll from "../shared/common/showAll/ShowAll";

const popularSelections = [
	{ id: '0', title: 'Все', value: 1 },
	{ id: '1', title: 'Тематические', value: 2 },
	{ id: '2', title: 'Регулярные', value: 3 },
];

const booksSelections = [
	{ id: '0', title: 'Все', value: 1 },
	{ id: '1', title: 'Книги', value: 2 },
	{ id: '2', title: 'Аудиокниги', value: 3 },
];

const SelectionsPage = () => {
	const router = useRouter()

	const { selections } = useSelector(state => state.selection)
	const { innerWidthWindow } = useSelector(state => state.common);

	const flagSwitcher = useMemo(() => {
		return router.query['showType'] === 'list'
	}, [router.query])

	const hasBooks = (() => {
		if(selections?.data?.length) {
			if(flagSwitcher) {
				return selections?.data?.some(i => i?.books?.length)
			} else {
				return selections?.data?.some(i => i?.books_count)
			}
		} else {
			return false
		}
	})()

	return (
		<div className="container">
			<Breadcrumbs
				data={[{
					path: `/selections`,
					title: 'Подборки'
				}]}
			/>

			<h1 className="title">Подборки</h1>

			<div className={styles.wrapper}>
				<div className={styles.main}>
					<div className={styles.filters}>
						{innerWidthWindow > 768 &&
							<div className={styles.descFilters}>
								<BookFilters
									filters={popularSelections}
									queryName={''}
								/>
								<BookFilters
									filters={booksSelections}
									queryName={''}
								/>
							</div>
						}

						{innerWidthWindow <= 768 &&
							<div>
								<MobileFilterModal>
									<span className={styles.filterTitle}>Категория</span>
									<BookFilters
										filters={popularSelections}
										queryName={''}
										onModal
									/>
									<span className={styles.filterLine}/>
									<span className={styles.filterTitle}>Тип</span>
									<BookFilters
										filters={booksSelections}
										queryName={''}
										onModal
									/>
								</MobileFilterModal>
							</div>
						}

						<Switcher flagSwitcher={flagSwitcher} />
					</div>

					{hasBooks ?
						flagSwitcher ?
							selections?.data?.map(i =>
								<div className={styles.mainListItem}>
									<div className={styles.titleFlex}>
										<Link href={`/selections/${i?.id}`}>
											<a className={classNames("title", styles.title)}>{i?.title}</a>
										</Link>
										<button
											className={classNames(styles.btn)}
										>
											Добавить подборку
										</button>
									</div>
									<Swiper
										spaceBetween={24}
										modules={[Navigation]}
										navigation={{
											prevEl: '.prevArrow',
											nextEl: '.nextArrow',
										}}
										slidesPerView={5}
									>
										{i?.books?.map(j => (
											<SwiperSlide key={j?.id}>
												<Book
													book={j}
													audio={audioFlag}
												/>
											</SwiperSlide>
										))}
										<button
											className={classNames('prevArrow', {
												// [st.btn]: !audioFlag,
												// [st.btnAudio]: audioFlag,
											})}
										>
											<ArrowRight className="arrowNext" />
										</button>
										<button
											className={classNames('nextArrow', {
												// [st.btn]: !audioFlag,
												// [st.btnAudio]: audioFlag,
											})}
										>
											<ArrowRight className="arrowNext" />
										</button>
									</Swiper>
									<ShowAll text={'Смотреть все'} url={`/selections/${i?.id}`} />
								</div>

							) :
							<div className={styles.mainGrid}>
								{selections?.data?.length > 0 &&
									selections?.data?.map(i =>
										<div className={styles.mainGridItem}>
											<CompilationItem
												key={i?.id}
												data={i}
												path={`/selections/${i?.id}`}
											/>
										</div>
									)
								}
							</div>
						:
						<p className="empty">Не найдено подборок</p>
					}

					{selections?.last_page > 1 &&
						<MyPagination
							lastPage={selections?.last_page}
						/>
					}
				</div>

				<div className={classNames(styles.advertisingBlock, {
					[styles.mt]: !flagSwitcher
				})}>
					<div className={styles.bannerBlock}>
						<img src="/banner.png" alt="" className={styles.banner} />
					</div>

					<div className={styles.bannerBlock}>
						<img src="/banner.png" alt="" className={styles.banner} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectionsPage;
