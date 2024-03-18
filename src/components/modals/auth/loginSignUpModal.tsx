import React, { useEffect } from "react";

import classes from "../../styles/modals/LoginSignUp.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

// Modal Popup for Login and Sign Up functionality
export default function LoginSignUpModal({ open, onClose }: Props) {
  // Close the modal when the user clicks outside of the modal
  const handleOutsideClick = (event: MouseEvent) => {
    const modal = document.getElementById("modal");
    if (modal && !modal.contains(event.target as Node)) {
      onClose();
    }
  };
  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={`${classes.modal}`}>
      <div className={classes.modal_content}>
        <span className={classes.close} onClick={onClose}>
          &times;
        </span>
        <h2>Login / Sign Up</h2>
        <p>Some text..</p>
      </div>
    </div>
  );
}
