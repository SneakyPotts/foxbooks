import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import Button from '../../shared/common/Button/Button';
import CommentComp from '../CommentItem';
import st from './reviews.module.scss';
import MyPagination from '../../shared/common/MyPagination';
import ReviewForm from "../../ReviewForm";
import ReviewService from "../../../http/ReviewService";

const Reviews = ({type}) => {
	const blockRef = useRef();

	const {innerWidthWindow} = useSelector(state => state.common);
	const {id} = useSelector(state => state.book?.book);

	const [reviewTyping, setReviewTyping] = useState(false);
	const [reviewsList, setReviewsList] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const reviewsType = {
		'1': 'positive',
		'2': 'neutral',
		'3': 'negative'
	}

	const requestType = {
		'books': 'book',
		'audioBooks': 'audio_book'
	}

	const reviewRequestData = {
		type: requestType[type],
		id: id,
		page
	}

	useEffect(() => {
		innerWidthWindow && ReviewService.getCurrentReviews(reviewRequestData)
			.then((response) => {
				setReviewsList((prev) => {
					return innerWidthWindow > 768 ? response.data.data.data : [...prev, ...response.data.data.data]
				});
				setLastPage(response.data.data.last_page)
			})
	}, [page, id, innerWidthWindow]);


	const handleLeaveReviewInput = () => {
		setReviewTyping(true);
	};

	return (
		<div ref={blockRef} id="reviews">
			<h2 className={st.reviewTitle}>Рецензии</h2>

			{!reviewTyping && (
				<Button
					typeButton="button"
					text="Написать рецензию"
					classNames={st.submitButton}
					click={handleLeaveReviewInput}
				/>
			)}

			{reviewTyping && (
				<div style={{paddingRight: '20px'}}>
					<ReviewForm
						bookType={type}
						onCancel={() => setReviewTyping(false)}
						onClose={() => setReviewTyping(false)}
					/>
				</div>
			)}

			{reviewsList?.map((it, idx) => (
				<div key={it.id} className={st.review}>
					<CommentComp
						idx={idx}
						data={it}
						type={reviewsType[it.review_type_id]}
						reviews={true}
					/>
				</div>
			))}

			{lastPage > 1
				? innerWidthWindow > 768
					? (<MyPagination
						currentPage={page}
						onClick={setPage}
						lastPage={lastPage}
						scrollTo={blockRef}
					/>)
					: lastPage > page
						? (
							<div
								className={st.pagination}
								onClick={() => setPage((prev) => prev + 1)}
							>Показать еще</div>
						)
						: null
				: null}
		</div>
	);
};

export default Reviews;
