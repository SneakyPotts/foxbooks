import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import Stars from '../shared/common/stars/Stars';
import DropDownArrow from '../../public/chevron-down.svg';
import st from './reviewComponent.module.scss';
import styles from "../CommentForm/styles.module.scss";
import AvatarWithLetter from "../shared/common/AvatarWithLetter";
import moment from "moment";
import Book from "../shared/common/book";

const ReviewComponent = ({ it, idx, reviews }) => {
	const date = moment(it?.created_at)
		.format('Do MMMM YYYY в HH:mm')
		.replace('-го', '');

	const profile = it?.user;
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
				book={it?.book}
				audio={it?.book?.type !== 'books'}
				similar
				inReview
			/>

			<div className={st.reviewContent}>
				<div
					className={classnames(st.reviewHead, {
						[st.quotes]: !reviews,
					})}
				>
					<div className={st.reviewer}>
						<div className={st.reviewerImg}>
							<div className={styles.avatar}>
								{profile?.avatar ? (
									<Image
										src={profile?.avatar}
										alt="Avatar"
										width="35"
										height="35"
										blurDataURL="/blur.webp"
									/>
								) : (
									<AvatarWithLetter
										letter={ profile?.name?.slice(0, 1) || 'П' }
										width={35}
										id={profile?.id}
										isProfile
									/>
								)}
							</div>
						</div>
						<span className={st.reviewerName}>{profile?.name}</span>
					</div>
					<p className={st.reviewDate}>{date}</p>
					{reviews && (
						<div className={st.reviewRaiting}>
							<span>Оценил книгу</span> <Stars value={it?.book?.rate_avg} />
						</div>
					)}
				</div>
				{reviews ? (
					<div>
						<h3 className={st.reviewTitle}>{it?.title}</h3>
						<p
							className={classnames(st.reviewText, {
								[st.reviewTextHide]: showMoreMap !== idx,
							})}
						>
							{it?.content}
						</p>
						{it?.content.length > 602 &&
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
						</span>}
					</div>
				) : (
					<p className={st.reviewText}>
						{it?.text}
					</p>
				)}
			</div>
		</div>
	);
};

export default ReviewComponent;
