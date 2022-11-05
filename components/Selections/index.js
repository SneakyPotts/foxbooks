import Switcher from '../switcher/Switcher';
import classNames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import Breadcrumbs from "../BreadCrumps/BreadCrumps";
import BookFilters from "../shared/common/booksFilters/BookFilters";
import MobileFilterModal from "../MobileFilterModal";
import MyPagination from "../shared/common/MyPagination";
import CompilationItem from "../CompilationItem";
import Link from 'next/link'
import ArrowRight from '../../public/chevron-right.svg';
import ShowAll from "../shared/common/showAll/ShowAll";
import Book from "../shared/common/book";
import styles from './selections.module.scss';
import {setAuthPopupVisibility} from "../../store/commonSlice";
import {addCompilationToFavorite, deleteCompilationFromFavorite} from "../../store/selectionSlice";
import Banners from "../shared/common/Banner/Banners";

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
	const dispatch = useDispatch()
	const router = useRouter()

	const { selections } = useSelector(state => state.selection)
	const { innerWidthWindow } = useSelector(state => state.common);
	const { isAuth } = useSelector(state => state.auth);

	const toggleToFavoriteHandler = (id, inFavorite) => {
		if(!isAuth) {
			dispatch(setAuthPopupVisibility(true))
		} else {
			if(inFavorite) {
				dispatch(deleteCompilationFromFavorite(id))
			} else {
				dispatch(addCompilationToFavorite(id))
			}
		}
	}

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
											<Link href={`/selections/${i?.slug}`}>
												<a className={classNames("title", styles.title)}>{i?.title}</a>
											</Link>
											<button
												onClick={() => toggleToFavoriteHandler(i?.id, i?.in_favorite)}
												className={classNames(styles.btn, {
													[styles.added]: i?.in_favorite
												})}
											>
												{i?.in_favorite ? 'Подборка добавлена' : 'Добавить подборку'}
											</button>
										</div>
										{
											(
												(!router.query?.bookType && i?.books.concat(i?.audio_books)?.length) ||
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
													breakpoints={{
														0: {
															slidesPerView: 3,
															spaceBetween: 10
														},
														768: {
															slidesPerView: 4,
															spaceBetween: 10
														},
														1025: {
															slidesPerView: 5,
															spaceBetween: 24
														}
													}}
												>
													{(
														router.query?.bookType === 'books'
															? i?.books
															: router.query?.bookType === 'audioBooks'
																? i?.audio_books
																: i?.books.concat(i?.audio_books)
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
													url={`/selections/${i?.slug}`}
													externalClass={styles.showMore}
												/>
											</>
										}
									</div>
								)
							}

							{(router.query['showType'] === 'block' || !router.query['showType']) &&
								<div className={styles.mainGrid}>
									{selections?.data?.map(i =>
										<div className={styles.mainGridItem}>
											<CompilationItem
												key={i?.id}
												data={i}
												path={`/selections/${i?.slug}`}
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
					[styles.mt]: router.query['showType'] === 'block' || !router.query['showType']
				})}>

				<Banners />
				</div>
			</div>
		</div>
	);
};

export default SelectionsPage;
