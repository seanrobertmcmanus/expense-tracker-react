import React from "react";
import classes from "../styles/modals/ModalWrapper.module.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function ModalWrapper({ children, onClick }: Props) {
  const handleWrapperClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClick && onClick();
    }
  };

  return (
    <div onClick={handleWrapperClick} className={`${classes.modal_wrapper}`}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
