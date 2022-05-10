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
import ShowAll from "../shared/common/showAll/ShowAll";
import Book from "../shared/common/book";

const popularSelections = [
	{ id: '0', title: 'Все', value: 3 },
	{ id: '1', title: 'Тематические', value: 1 },
	{ id: '2', title: 'Регулярные', value: 2 },
];

const booksSelections = [
	{ id: '0', title: 'Все', value: 'all' },
	{ id: '1', title: 'Книги', value: 'books' },
	{ id: '2', title: 'Аудиокниги', value: 'audioBooks' },
];

const SelectionsPage = () => {
	const router = useRouter()

	const { selections } = useSelector(state => state.selection)
	const { innerWidthWindow } = useSelector(state => state.common);

	return (
		<div className="container">
			<Breadcrumbs
				data={[{
					path: `/selections?selectionCategory=3&bookType=all&showType=list`,
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
									queryName={'selectionCategory'}
								/>
								<BookFilters
									filters={booksSelections}
									queryName={'bookType'}
								/>
							</div>
						}

						{innerWidthWindow <= 768 &&
							<div>
								<MobileFilterModal>
									<span className={styles.filterTitle}>Категория</span>
									<BookFilters
										filters={popularSelections}
										queryName={'selectionCategory'}
										onModal
									/>
									<span className={styles.filterLine}/>
									<span className={styles.filterTitle}>Тип</span>
									<BookFilters
										filters={booksSelections}
										queryName={'bookType'}
										onModal
									/>
								</MobileFilterModal>
							</div>
						}

						<Switcher flagSwitcher={router.query['showType'] === 'list'} />
					</div>

					{selections?.data?.length ?
						<>
							{router.query['showType'] === 'list' &&
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
										{
											(
												(router.query?.bookType === 'all' && i?.books.concat(i?.audio_books)?.length) ||
												(router.query?.bookType === 'books' && i?.books?.length) ||
												(router.query?.bookType === 'audioBooks' && i?.audio_books?.length)
											) && <>
												<Swiper
													modules={[Navigation]}
													navigation={{
														prevEl: '.prevArrow',
														nextEl: '.nextArrow',
													}}
													spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
													slidesPerView={innerWidthWindow <= 768 ? 3.1 : 5}
													className={styles.slider}
												>
													{(
														router.query?.bookType === 'books' ? i?.books :
															router.query?.bookType === 'audioBooks' ? i?.audio_books :
																i?.books.concat(i?.audio_books)
													).map(j =>
														<SwiperSlide key={j?.id}>
															<Book
																book={j}
																audio={j?.type === 'audioBooks'}
																type={j?.type}
															/>
														</SwiperSlide>
														)
													}
													<button className='prevArrow'>
														<ArrowRight className="arrowNext" />
													</button>
													<button className='nextArrow'>
														<ArrowRight className="arrowNext" />
													</button>
												</Swiper>

												<ShowAll
													text={'Смотреть все'}
													url={`/selections/${i?.id}`}
													externalClass={styles.showMore}
												/>
											</>
										}
									</div>
								)
							}

							{router.query['showType'] === 'block' &&
								<div className={styles.mainGrid}>
									{selections?.data?.map(i =>
										<div className={styles.mainGridItem}>
											<CompilationItem
												key={i?.id}
												data={i}
												path={`/selections/${i?.id}`}
											/>
										</div>
									)}
								</div>
							}
						</>
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
					[styles.mt]: router.query['showType'] === 'block'
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
