import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import Stars from '../shared/common/stars/Stars';
import DropDownArrow from '../../public/chevron-down.svg';
import st from './reviewComponent.module.scss';
import styles from "../CommentForm/styles.module.scss";
import AvatarWithLetter from "../shared/common/AvatarWithLetter";
import moment from "moment";
import Book from "../shared/common/book";

const ReviewComponent = ({ it, idx }) => {
	const route = useRouter();

	// const date = moment(data?.updated_at)
	// 	.format('Do MMMM YYYY в HH:mm')
	// 	.replace('-го', '')

	const [showMoreMap, setShowMoreMap] = useState(null);

	const onShowMore = idx => {
		setShowMoreMap(prev => {
			if (prev === idx) {
				return null;
			} else {
				return idx;
			}
		});
	};

	return (
		<div className={st.review}>
			<Book
				similar
				inReview
			/>

			<div className={st.reviewContent}>
				<div
					className={classnames(st.reviewHead, {
						[st.quotes]: route.pathname === '/quotes',
					})}
				>
					<div className={st.reviewer}>
						<div className={st.reviewerImg}>
							<div className={styles.avatar}>
								{/*{profile?.avatar ? (*/}
								{/*	<Image*/}
								{/*		src={profile?.avatar}*/}
								{/*		alt="Avatar"*/}
								{/*		width="35"*/}
								{/*		height="35"*/}
								{/*		placeholder="blur"*/}
								{/*		blurDataURL="/blur.webp"*/}
								{/*	/>*/}
								{/*) : (*/}
									<AvatarWithLetter
										letter={
											// profile?.nickname?.slice(0, 1) ||
											// profile?.name?.slice(0, 1) ||
											'П'
										}
										width={35}
										// id={profile?.id}
										id={20}
										isProfile
									/>
								{/*)}*/}
							</div>
						</div>
						<span className={st.reviewerName}>Ник</span>
					</div>
					<p className={st.reviewDate}>20 октября 2021 в 14:05</p>
					{route.pathname === '/reviews' && (
						<div className={st.reviewRaiting}>
							<span>Оценил книгу</span> <Stars />
						</div>
					)}
				</div>
				{route.pathname === '/reviews' ? (
					<div>
						<h3 className={st.reviewTitle}>Гарри получает похвалы за то, что нарушает запреты</h3>
						<p
							className={classnames(st.reviewText, {
								[st.reviewTextHide]: showMoreMap !== idx,
							})}
						>
              Почему-то до этого момента у меня возникало к книге намного меньше
              вопросов, хотя я перечитывала её всего пару лет назад. А сразу
              после прочтения седьмой части и по сравнению с ней первая история
              о Мальчике, Который Выжил выглядит сырой, недодуманной и слишком
              детской - но да-да, эта книга изначально была для детей. И это
              впечатление скорее говорит о том, насколько выросла история о
              Гарри Поттере по прошествии лет, как оброс подробностями и жизнью
              магический мир, захвативший так много читателей по всему миру.
              Большинство знают историю о Гарри, частично или полностью, так что
              спойлерить её весьма проблематично, и я тут порассуждаю над
              некоторыми моментами, которые привлекли моё внимание или вызвали
              недоумение в первой книге. О каких-то я уже слышала от других
              людей, другие пришли мне в И это впечатление скорее говорит о том,
              насколько выросла история о Гарри Поттере по прошествии лет, как
              оброс подробностями и жизнью магический мир, захвативший так много
              читателей по всему миру. Большинство знают историю о Гарри,
              частично или полностью, так что спойлерить её весьма
              проблематично, и я тут порассуждаю над некоторыми моментами,
              которые привлекли моё внимание или вызвали недоумение в первой
              книге. О каких-то я уже слышала от других людей, другие пришли мне
              в
						</p>
						<span
							className={classnames(st.showMoreLink)}
							onClick={() => onShowMore(idx)}
						>
              Показать полностью{' '}
							<DropDownArrow
								className={classnames(st.dropDownArrow, {
									[st.up]: showMoreMap === idx,
								})}
							/>
						</span>
					</div>
				) : (
					<p className={st.reviewText}>
            Одна ложь тянет за собой другую. Солгав один раз, уже нельзя
            остановиться. Всё равно что плыть в дырявой лодке: без конца
            приходится вычерпывать воду, чтобы не утонуть.
					</p>
				)}
			</div>
		</div>
	);
};

export default ReviewComponent;
