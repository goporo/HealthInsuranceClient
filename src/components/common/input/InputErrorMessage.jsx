import React from 'react';
import { twMerge } from 'tailwind-merge';

const InputErrorMessage = (props) => {
  const { message, className = '' } = props;
  if (typeof message === 'boolean') {
    return <></>;
  }
  return (
    <p className={twMerge(className, 'mt-2 px-2.5 text-xs text-red-primary')}>
      {message}
    </p>
  );
};
export default InputErrorMessage;
