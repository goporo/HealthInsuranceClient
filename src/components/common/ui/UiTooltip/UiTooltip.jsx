// import 'tippy.js/dist/tippy.css'; 
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Tippy from '@tippyjs/react';



const UiTooltip = (props) => {
  const {
    children,
    content,
    placement,
    interactive,
    className = '',
    visible,
    zIndex,
  } = props;
  return (
    <Tippy
      className={twMerge(className)}
      placement={placement}
      interactive={interactive}
      content={content}
      visible={visible}
      zIndex={zIndex}
    >
      {children}
    </Tippy>
  );
};
export default UiTooltip;
