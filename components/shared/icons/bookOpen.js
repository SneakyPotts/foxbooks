import React from 'react';

const BookOpen = ({ stroke }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.66699 2.5H6.66705C7.55112 2.5 8.39897 2.85119 9.0241 3.47632C9.64923 4.10145 10.0004 4.94931 10.0004 5.83337V17.5002C10.0004 16.8371 9.73703 16.2012 9.26818 15.7324C8.79934 15.2635 8.16344 15.0001 7.50039 15.0001H1.66699V2.5Z"
        stroke={stroke || 'inherit'}
        strokeWidth="1.66669"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3334 2.5H13.3334C12.4493 2.5 11.6015 2.85119 10.9763 3.47632C10.3512 4.10145 10 4.94931 10 5.83337V17.5002C10 16.8371 10.2634 16.2012 10.7322 15.7324C11.2011 15.2635 11.837 15.0001 12.5 15.0001H18.3334V2.5Z"
        stroke={stroke || 'inherit'}
        strokeWidth="1.66669"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookOpen;
