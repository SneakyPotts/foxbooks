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
									yo
									<BookFilters
										filters={popularSelections}
										queryName={''}
										onModal
									/>
									ye
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



					{selections?.last_page > 1 &&
						<MyPagination
							lastPage={selections?.last_page}
						/>
					}
				</div>

				<div className={styles.advertisingBlok}>
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
