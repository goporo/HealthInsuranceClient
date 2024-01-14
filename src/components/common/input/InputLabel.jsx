import { twMerge } from "tailwind-merge";
import React from 'react';


const InputLabel = (props) => {
  const {
    label,
    labelClassName = '',
    id,
    required = false,
    hasAsterisk = false,
  } = props;
  if (!label) return <></>;
  return (
    <label
      className={twMerge(
        labelClassName,
        'mb-2 mt-5 block px-0 text-[#58647a] text-[12px]'
      )}
      {...(id ? { htmlFor: id } : {})}
    >
      {label}{' '}
      {(required || hasAsterisk) && (
        <span className="text-primary"> *</span>
      )}
    </label>
  );
};
export default InputLabel;
