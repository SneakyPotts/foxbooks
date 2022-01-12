import React from 'react';

const BookMark = ({classNames}) => {
	return (
		<div>
			<svg className={classNames} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4.6875 0V24L12 16.6875L19.3125 24V0H4.6875Z" fill="#909190"/>
			</svg>
		</div>

	);
};

export default BookMark;