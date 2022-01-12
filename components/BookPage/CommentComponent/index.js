import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import Eye from '../../shared/icons/eye';
import DropDownArrow from '../../../public/chevron-down.svg';
import Like from '../../shared/icons/heart';
import Comment from '../../shared/icons/comment';
import Button from '../../shared/common/Button/Button';
import st from './comComp.module.scss';

const CommentComp = ({ idx, type }) => {
	const [showMore, setShowMore] = useState(false);
	const [mainCommentIdx, setMainCommenIdx] = useState(null);
	const [inputIdx, setInputIdx] = useState(null);

	const onShowMore = () => {
		setShowMore(!showMore);
	};
	const handleInputMap = idx => {
		setInputIdx(idx);
	};

	const leaveComment = idx => {
		setMainCommenIdx(prev => {
			if (prev === idx) {
				return null;
			} else {
				return idx;
			}
		});
	};
	const handleCancelBtn = () => {
		setInputIdx(null);
		setMainCommenIdx(null);
	};

	return (
		<div
			className={classnames(st.reviewColor, {
				[st.reviewColorPositive]: type === 'positive',
				[st.reviewColorNegative]: type === 'negative',
				[st.reviewColorNeutral]: type === 'neutral',
			})}
		>
			<div>
				<div className={st.reviewer}>
					<div className={st.reviewerIcon}>
						<Image
							src="/horizontalBookCovers/bookCover1.png"
							alt=""
							width="35"
							height="35"
							// placeholder="blur"
							blurDataURL="/images/blur.jpg"
						/>
					</div>
					<h3 className={st.reviewerName}>Ник</h3>
				</div>
				<div className={st.reviewInfo}>
					<span className={st.reviewDate}>20 октября 2021 в 14:05</span>
					<span className={st.reviewView}>
						<span className={st.reviewViewCount}>456</span> <Eye />
					</span>
				</div>
				<h3 className={st.reviewTitle}>
          Гарри получает похвалы за то, что нарушает запреты
				</h3>
				<div>
					<p
						className={classnames(st.reviewText, {
							[st.reviewTextHide]: !showMore,
						})}
					>
            Почему-то до этого момента у меня возникало к книге намного меньше
            вопросов, хотя я перечитывала её всего пару лет назад. А сразу после
            прочтения седьмой части и по сравнению с ней первая история о
            Мальчике, Который Выжил выглядит сырой, недодуманной и слишком
            детской - но да-да, эта книга изначально была для детей. И это
            впечатление скорее говорит о том, насколько выросла история о Гарри
            Поттере по прошествии лет, как оброс подробностями и жизнью
            магический мир, захвативший так много читателей по всему миру.
            Большинство знают историю о Гарри, частично или полностью, так что
            спойлерить её весьма проблематично, и я тут порассуждаю над
            некоторыми моментами, которые привлекли моё внимание или вызвали
            недоумение в первой книге. О каких-то я уже слышала от других людей,
            другие пришли мне Почему-то до этого момента у меня возникало к
            книге намного меньше вопросов, хотя я перечитывала её всего пару лет
            назад. А сразу после прочтения седьмой части и по сравнению с ней
            первая история о Мальчике, Который Выжил выглядит сырой,
            недодуманной и слишком детской - но да-да, эта книга изначально была
            для детей. И это впечатление скорее говорит о том, насколько выросла
            история о Гарри Поттере по прошествии лет, как оброс подробностями и
            жизнью магический мир, захвативший так много читателей по всему
            миру. Большинство знают историю о Гарри, частично или полностью, так
            что спойлерить её весьма проблематично, и я тут порассуждаю над
            некоторыми моментами, которые привлекли моё внимание или вызвали
            недоумение в первой книге. О каких-то я уже слышала от других людей,
            другие пришли мне
					</p>
					<span className={classnames(st.showMoreLink)} onClick={onShowMore}>
            Показать полностью{' '}
						<DropDownArrow
							className={classnames(st.dropDownArrow, {
								[st.up]: showMore,
							})}
						/>
					</span>
					<div className={st.reviewStatistic}>
						<span className={st.reviewIcon}>
							<Like />
						</span>
						<span className={st.reviewLike}>3115</span>
						<span className={st.reviewIcon} onClick={() => leaveComment(idx)}>
							<Comment />
						</span>
						<span>700</span>
					</div>
				</div>
			</div>
			{mainCommentIdx === idx && (
				<form className={st.userForm}>
					<div className={st.userFormHeader}>
						<div className={st.userIcon}>
							<Image
								src="/horizontalBookCovers/book.png"
								alt=""
								width="35"
								height="35"
								// placeholder="blur"
								blurDataURL="/images/blur.jpg"
							/>
						</div>
						<input
							placeholder="Написать комментарий"
							className={st.userInput}
							onClick={() => {
								handleInputMap(idx);
							}}
						/>
					</div>
					<div className={st.userComment}>
						{inputIdx === idx && (
							<div className={st.controllBtn}>
								<Button
									typeButton="submit"
									text="Отправить"
									classNames={st.submitButton}
								/>
								<button className={st.cancelBtn} onClick={handleCancelBtn}>
                  Отменить
								</button>
							</div>
						)}
					</div>
				</form>
			)}
		</div>
	);
};

export default CommentComp;
