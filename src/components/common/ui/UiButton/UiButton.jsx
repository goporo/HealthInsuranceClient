import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";

const UiButton = ({ children, icon, onClick, className, ...props }) => {
  return (
    <button
      className={twMerge(
        "flex flex-row items-center justify-center py-0 px-[16px] font-bold whitespace-nowrap",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} className="w-fit" />}
      {children}
    </button>
  );
};

export default UiButton;
