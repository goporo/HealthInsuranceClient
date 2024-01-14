import React from 'react';

import InputErrorMessage from './InputErrorMessage';
import { twMerge } from 'tailwind-merge';
import InputLabel from './InputLabel';

const defaultTextInputClassName =
  'w-full bg-white py-2.5 px-3 text-sm text-black-primary outline-none placeholder:opacity-60 focus:ring-0';


const TextInput = React.forwardRef(
  (props, ref) => {
    const {
      wrapperClassName = 'w-full',
      label,
      id,
      labelClassName = '',
      inputClassName = '',
      error = '',
      required,
      postFix,
      postFixClassName = '',
      readOnly,
      hasAsterisk,
      disabled,
      subComponent,
      ...inputProps
    } = props;
    return (
      <div className={twMerge(wrapperClassName)}>
        {label && (
          <InputLabel
            label={label}
            labelClassName={labelClassName}
            id={id}
            required={required}
            hasAsterisk={hasAsterisk}
          />
        )}
        <div className={twMerge((postFix || subComponent) && 'flex')}>
          <input
            ref={ref}
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            {...inputProps}
            className={twMerge(
              inputClassName,
              defaultTextInputClassName,
              'border border-gray-primary rounded-xl bg-[#f6f7fa]',
              error && '!border-red-primary',
              postFix && 'flex-1 text-right',
              readOnly && '!bg-gray-300',
              disabled && '!bg-gray-300 text-[#889195]'
            )}
          />
          {postFix && (
            <div
              className={twMerge(
                postFixClassName,
                'border border-gray-primary bg-gray-300 py-2.5 px-3 text-sm text-black-primary',
                error && 'border-red-primary border-l-gray-primary'
              )}
            >
              <p>{postFix}</p>
            </div>
          )}
          {subComponent}
        </div>
        {error && <InputErrorMessage message={error} />}
      </div>
    );
  }
);

// fix eslint display name
TextInput.displayName = 'TextInput';

export default TextInput;
