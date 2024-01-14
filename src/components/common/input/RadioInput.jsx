import React from 'react';
import UiTooltip from '../ui/UiTooltip/UiTooltip';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { twMerge } from 'tailwind-merge';
import './RadioInput.css'

const RadioInput = React.forwardRef(
  (props, ref) => {
    const {
      label,
      labelClassName = '',
      wrapperClassName = '',
      inputClassName = '',
      id,
      toolTipContent,
      ...inputProps
    } = props;


    return (
      <div className={twMerge(wrapperClassName, 'flex items-center gap-x-2 !cursor-pointer')}>
        {/* Input */}
        <div className="blue-radio group">
          <label
            {...(id ? { htmlFor: id } : {})}
            className="group-hover:opacity-20 cursor-pointer !transition-all opacity-0  bg-red-200 w-10 h-10 rounded-full absolute left-0 top-0 -translate-x-[10px] -translate-y-[10px] z-0" />
          <input
            id={id}
            ref={ref}
            type="radio"
            color='red'
            className={twMerge(inputClassName, 'blue-radio__input !cursor-pointer')}
            {...inputProps}
          />
          <span className="blue-radio__outer" />
          <span className="blue-radio__inner" />

        </div>
        {/* Label */}
        {label && (
          <label
            {...(id ? { htmlFor: id } : {})}
            className={twMerge(labelClassName, 'text-sm text-black-primary !cursor-pointer ml-1')}
          >
            {label}
          </label>
        )}
        {/* Tooltip */}
        {toolTipContent && (
          <UiTooltip content={toolTipContent}>
            <div className="h-3.5 w-3.5 leading-[0px]">
              <FontAwesomeIcon icon={faInfo} className="text-white w-4 h-4" />
            </div>
          </UiTooltip>
        )}
      </div>
    );
  });

RadioInput.displayName = 'RadioInput';
export default RadioInput;
