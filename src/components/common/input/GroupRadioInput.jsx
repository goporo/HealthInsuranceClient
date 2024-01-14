
import uniqueId from 'lodash/uniqueId';
import React, { useImperativeHandle, useRef } from 'react';

import RadioInput from './RadioInput';
import { twMerge } from 'tailwind-merge';
import InputLabel from './InputLabel';
import InputErrorMessage from './InputErrorMessage';



const GroupRadioInput = React.forwardRef((props, ref) => {
  const {
    wrapperClassName = '',
    groupInputClassName = 'flex gap-x-4',
    wrapperInputClassName = '',
    label,
    labelClassName = '!px-0 !text-[14px] !mb-4',
    required,
    error,
    options,
    name,
    value,
    onChange,
    notes,
  } = props;
  const divRef = useRef(null);
  const handleOnChange = (newValue) => {
    onChange(newValue);
  };

  const handleFocus = () => {
    divRef?.current?.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: handleFocus,
  }));

  return (
    <div ref={divRef} tabIndex={1} className={twMerge(wrapperClassName)}>
      {label && (
        <InputLabel
          label={label}
          labelClassName={twMerge(labelClassName)}
          id={name}
          required={required}
        />
      )}
      <div className={twMerge(groupInputClassName)}>
        {options.map((item, index) => {
          const radioId = `radio-${name}-${index === 0 ? name : name + index
            }-${uniqueId()}`;

          return (
            <RadioInput
              toolTipContent={notes ? notes[index] : undefined}
              key={radioId}
              id={radioId}
              name={name}
              label={item.label}
              value={item.value}
              checked={item.value === value}
              onChange={(e) => handleOnChange(e.target.value)}
              wrapperClassName={wrapperInputClassName}
            />
          );
        })}
      </div>
      {error && <InputErrorMessage message={error} />}
    </div>
  );
});
GroupRadioInput.displayName = 'GroupRadioInput';
export default GroupRadioInput;
