import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Stars = ({
  activeStart = false,
  value = 3.5,
  color = '#D5D5D5',
  count = 5,
  onChange,
}) => {
  const secondExample = {
    size: 14,
    count: count,
    value: value,
    color: color,
    activeColor: '#FEC420',
    edit: activeStart,
    // a11y: false,
    isHalf: false,
    emptyIcon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.765L9 13.3275L4.365 15.765L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z"
          stroke="#D5D5D5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.765L9 13.3275L4.365 15.765L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z"
          fill="#FEC420"
        />
      </svg>
    ),
    onChange: newValue => onChange(newValue),
  };

  return <ReactStars {...secondExample} />;
};

export default Stars;
