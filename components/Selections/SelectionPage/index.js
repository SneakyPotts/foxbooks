import React, { useState } from 'react';
import Book from '../../shared/common/book';
import styles from "../../MyBooks/styles.module.scss";
import st from './selectionPage.module.scss';
import Image from "next/image";
import BackBtn from "../../shared/common/BackBtn";
import Button from "../../shared/common/Button/Button";
import classNames from "classnames";
import {useRouter} from "next/router";

const SelectionPage = () => {
	const router = useRouter()
	const data = [
		{ id: '0' },
		{ id: '1' },
		{ id: '2' },
		{ id: '3' },
		{ id: '4' },
		{ id: '5' },
		{ id: '6' },
		{ id: '7' },
		{ id: '8' },
		{ id: '9' },
		{ id: '10' },
		{ id: '11' },
		{ id: '12' },
		{ id: '13' },
		{ id: '14' },
		{ id: '15' },
		{ id: '16' },
		{ id: '17' },
		{ id: '18' },
		{ id: '19' },
	];

	const [isAdded, setIsAdded] = useState(false)

	const toggleHandler = () => {
		setIsAdded(prev => !prev)
	}

	return (
		<>
			<div className={styles.compilationWrapper}>
				<Image
					src={'/selectionCover.png'}
					layout={'fill'}
					placeholder="blur"
					blurDataURL="/blur.webp"
					className={styles.compilationImg}
				/>

				<BackBtn
					onClick={() => router.back()}
					externalClass={styles.compilationBack}
				/>
				<h2 className={styles.compilationTitle}>Что читать на карантине? Лучшие книги о любви 2021</h2>
				<div className={styles.compilationControls}>
					<Button
						text={isAdded ? 'Подборка добавлена' : 'Добавить подборку'}
						classNames={classNames(styles.compilationBtn, {
							[st.added]: isAdded
						})}
						click={toggleHandler}
					/>
				</div>
			</div>
			<div className={classNames("container", styles.compilationContainer, st.selectionContainer)}>
        <span
					className={classNames(styles.compilationBookCount, {
						[styles.empty]: 1
					})}
				>
          <span>0</span>
          Книги
        </span>

				<Button
					text={isAdded ? 'Подборка добавлена' : 'Добавить подборку'}
					classNames={classNames(styles.compilationBtn, st.respBtn, {
						[st.added]: isAdded
					})}
					click={toggleHandler}
				/>

				<p className={st.selectionText}>
          Young Adult без рамок и границ. Никаких неудобных вопросов и запретных
          тем. Только искренние эмоции.
				</p>

				<div className={st.selectionGrid}>
					{data.map(i =>
						<Book
							key={i?.id}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default SelectionPage;
