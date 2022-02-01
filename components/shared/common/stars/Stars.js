import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';

const Stars = ({
  activeStart = false,
  value = 3.5,
  color = '#D5D5D5',
  count = 5,
  onChange,
}) => {
  const { innerWidthWindow } = useSelector(state => state.common);

  const secondExample = {
    size: 14,
    count: 5,
    value: value,
    color: color,
    activeColor: '#FEC420',
    edit: activeStart,
    // a11y: false,
    isHalf: false,
    emptyIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1.67665L9.86489 5.64938C9.93567 5.80016 10.0769 5.9058 10.2415 5.93111L14.4629 6.57991L11.3922 9.72483C11.2813 9.83842 11.231 9.99794 11.2565 10.1546L11.9757 14.5641L8.24196 12.4994C8.0914 12.4161 7.9086 12.4161 7.75804 12.4994L4.02426 14.5641L4.74348 10.1546C4.76904 9.99794 4.71866 9.83842 4.60775 9.72483L1.5371 6.57991L5.75846 5.93111C5.9231 5.9058 6.06433 5.80016 6.13511 5.64938L8 1.67665Z" stroke="#D5D5D5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>


    ),
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0.5L10.3175 5.195L15.5 5.9525L11.75 9.605L12.635 14.765L8 12.3275L3.365 14.765L4.25 9.605L0.5 5.9525L5.6825 5.195L8 0.5Z" fill="#FEC420"/>
        </svg>

    ),
    onChange: newValue => onChange(newValue),
  };

  return <ReactStars {...secondExample} />;
};

export default Stars;
