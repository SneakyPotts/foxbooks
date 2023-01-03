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
    count: Number(count),
    value: Number(value),
    color: color,
    activeColor: '#FEC420',
    edit: activeStart,
    // a11y: false,
    isHalf: false,
    emptyIcon: (
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 1.62963L9.86915 5.41631C9.94192 5.56374 10.0825 5.66597 10.2452 5.68974L14.4258 6.3008L11.4011 9.24682C11.2832 9.36169 11.2294 9.52726 11.2572 9.68952L11.9709 13.8508L8.23273 11.885C8.08703 11.8083 7.91297 11.8083 7.76727 11.885L4.02909 13.8508L4.7428 9.68952C4.77063 9.52726 4.7168 9.36169 4.59887 9.24682L1.57421 6.3008L5.75481 5.68974C5.91749 5.66597 6.05808 5.56374 6.13085 5.41631L8 1.62963Z"
          stroke="#D5D5D5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    halfIcon: (
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 1.62963L9.86915 5.41631C9.94192 5.56374 10.0825 5.66597 10.2452 5.68974L14.4258 6.3008L11.4011 9.24682C11.2832 9.36169 11.2294 9.52726 11.2572 9.68952L11.9709 13.8508L8.23273 11.885C8.08703 11.8083 7.91297 11.8083 7.76727 11.885L4.02909 13.8508L4.7428 9.68952C4.77063 9.52726 4.7168 9.36169 4.59887 9.24682L1.57421 6.3008L5.75481 5.68974C5.91749 5.66597 6.05808 5.56374 6.13085 5.41631L8 1.62963Z"
          stroke="#D5D5D5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    filledIcon: (
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0.5L10.3175 5.195L15.5 5.9525L11.75 9.605L12.635 14.765L8 12.3275L3.365 14.765L4.25 9.605L0.5 5.9525L5.6825 5.195L8 0.5Z"
          fill="#FEC420"
        />
      </svg>
    ),
    onChange: newValue => onChange(newValue),
  };

  return <ReactStars {...secondExample} />;
};

export default Stars;
