import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Stars = ({ activeStart = false, value = 3.5, color = '#D5D5D5', onChange }) => {
	const secondExample = {
		size: 14,
		count: 5,
		value: value,
		color: color,
		activeColor: '#FEC420',
		edit: activeStart,
		// a11y: false,
		isHalf: true,
		emptyIcon: <i className="far fa-star"/>,
		halfIcon: <i className="fa fa-star-half-alt"/>,
		filledIcon: <i className="fa fa-star"/>,
		onChange: (newValue) => onChange(newValue)
	}

	return <ReactStars {...secondExample} />;
};

export default Stars;
