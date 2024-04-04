import React, { useEffect, useState } from "react";

import baseModal from "../../styles/modals/BaseModal.module.css";
import classes from "../../styles/modals/LoginSignUp.module.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import ModalWrapper from "../modalWrapper";

import LoginComponent from "./loginComponent";
import SignUpComponent from "./signUpComponent";
import { set } from "zod";

const MODE_LOGIN = "login";
const MODE_SIGNUP = "signup";

interface Props {
  open: boolean;
  onClose: () => void;
  startOn?: string;
}

// Modal Popup for Login and Sign Up functionality
export default function LoginSignUpModal({
  open,
  onClose,
  startOn = MODE_LOGIN,
}: Props) {
  const [selected, setSelected] = useState(startOn);
  const [selectButtonAnimation, setSelectButtonAnimation] = useState(false);
  const selectButtonControls = useAnimation();

  // Handle Login to Sign Up Toggle
  const handleSelected = (selected: string) => {
    setSelected(selected);
  };

  const toggleSelected = () => {
    setSelected(selected === MODE_LOGIN ? MODE_SIGNUP : MODE_LOGIN);
  };

  // Handle Modal Close
  const handleClose = () => {
    setSelected(startOn);
    onClose();
  };

  // Toggle Menu Button component
  const menuToggleButton = () => {
    const handleToggle = async () => {
      setSelectButtonAnimation(true);
      toggleSelected();
      await selectButtonControls.start(
        {
          rotate: [0, 180, 0],
          scale: [1, 1.5, 1],
          borderRadius: ["20%", "5px"],
        },
        { duration: 0.6 }
      );
      setSelectButtonAnimation(false);
    };

    return (
      <motion.button
        animate={selectButtonControls}
        onClick={handleToggle}
        className={`${classes.toggle__button}`}
      >
        {selectButtonAnimation
          ? ""
          : selected === MODE_LOGIN
          ? "Sign Up"
          : "Login"}
      </motion.button>
    );
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <ModalWrapper onClick={handleClose}>
        <div className={baseModal.modal}>
          <div className={classes.modal_content}>
            {/* Login Sign Up Toggle */}
            <div className={`${classes.modal_form}`}>
              <LoginComponent
                handleSelected={handleSelected}
                type={MODE_LOGIN}
                selected={selected}
              />
              <SignUpComponent
                handleSelected={handleSelected}
                type={MODE_SIGNUP}
                selected={selected}
              />
            </div>
            <motion.div
              key={"decorSlider"}
              transition={{ type: "tween", duration: 0.3 }}
              initial={{ x: selected === MODE_LOGIN ? -0 : "-101%" }}
              animate={{ x: selected === MODE_LOGIN ? -0 : "101%" }}
              className={`${classes.modal_decor} ${
                selected === MODE_LOGIN
                  ? classes.modal_left
                  : classes.modal_right
              }`}
            >
              {/* Website Banner */}
              <div className={`${classes.banner__container}`}>
                <i
                  className={`fa-solid fa-cubes-stacked ${classes.logo__icon}`}
                ></i>
                <h1 className={`${classes.banner__header}`}>ExpenseTracker+</h1>
              </div>

              {/* Toggle Login/Signup */}
              <div className={`${classes.toggle__container}`}>
                {/* Message */}
                {selected === MODE_LOGIN && (
                  <motion.p
                    key={"signUpMessage"}
                    className={`${classes.toggle__message}`}
                  >
                    Don't have an account?
                  </motion.p>
                )}
                {selected === MODE_SIGNUP && (
                  <motion.p
                    key={"loginMessage"}
                    className={`${classes.toggle__message}`}
                  >
                    Already have an account?
                  </motion.p>
                )}

                {/* Button */}
                <div className={`${classes.toggle__button__wrapper}`}>
                  {menuToggleButton()}
                </div>
              </div>

              {/* Future Note, create an animation component with scrolling lines */}
              {/* <motion.div
                animate={{
                  y: selected === MODE_LOGIN ? -0 : 300,
                  x: selected === MODE_LOGIN ? -0 : 100,
                }}
                transition={{ type: "tween", duration: 0.3 }}
                className={`${classes.modal_bar}`}
              ></motion.div> */}
            </motion.div>
          </div>
        </div>
      </ModalWrapper>
    </AnimatePresence>
  );
}
