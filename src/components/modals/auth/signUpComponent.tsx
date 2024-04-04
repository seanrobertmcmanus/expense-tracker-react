import classes from "../../styles/modals/LoginSignUp.module.css";
import { AnimatePresence, motion } from "framer-motion";
import SignUpForm from "../../forms/signUpForm";

interface Props {
  handleSelected: (selected: string) => void;
  type: string;
  selected: string;
}

export default function signUpComponent({
  handleSelected,
  type,
  selected,
}: Props) {
  return (
    <AnimatePresence>
      {selected === type && (
        <motion.div
          key={"signupForm"}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          exit={{ x: "-100%" }}
          className={`${classes.signup}`}
        >
          {/* Title */}
          <div className={`${classes.header__container}`}>
            <h2 className={`${classes.header}`}>Sign Up</h2>
          </div>
          {/* Form */}
          <div className={`${classes.form__container}`}>
            <SignUpForm />
          </div>
          {/* Toggle */}
          <div className={`${classes.mobile_toggle}`}>
            <p>Already have an account?</p>
            <button onClick={() => handleSelected("login")}>Login</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
