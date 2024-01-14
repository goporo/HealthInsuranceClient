import React from 'react';
import PropTypes from 'prop-types';

const SVGStep1 = ({ className, fill }) => {
  return (
    <svg width="36" height="36" className={className} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="99" fill={fill || 'currentColor'} />
      <path d="M9.6665 15C9.6665 13.8954 10.5619 13 11.6665 13H13.8332V23H11.6665C10.5619 23 9.6665 22.1046 9.6665 21V15Z" fill="#1C1D1F" />
      <path d="M17.1665 13H24.3332C25.4377 13 26.3332 13.8954 26.3332 15V21C26.3332 22.1046 25.4377 23 24.3332 23H17.1665V13Z" fill="#1C1D1F" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.4998 9.66699C15.9601 9.66699 16.3332 10.0401 16.3332 10.5003V25.5003C16.3332 25.9606 15.9601 26.3337 15.4998 26.3337C15.0396 26.3337 14.6665 25.9606 14.6665 25.5003V10.5003C14.6665 10.0401 15.0396 9.66699 15.4998 9.66699Z" fill="#BCC5D6" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13 25.5003C13 25.0401 13.3731 24.667 13.8333 24.667H17.1667C17.6269 24.667 18 25.0401 18 25.5003C18 25.9606 17.6269 26.3337 17.1667 26.3337H13.8333C13.3731 26.3337 13 25.9606 13 25.5003Z" fill="#BCC5D6" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13 10.5003C13 10.0401 13.3731 9.66699 13.8333 9.66699H17.1667C17.6269 9.66699 18 10.0401 18 10.5003C18 10.9606 17.6269 11.3337 17.1667 11.3337H13.8333C13.3731 11.3337 13 10.9606 13 10.5003Z" fill="#BCC5D6" />
    </svg>
  );
};

export default SVGStep1;

SVGStep1.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  // Add more PropTypes as needed for other props
};


