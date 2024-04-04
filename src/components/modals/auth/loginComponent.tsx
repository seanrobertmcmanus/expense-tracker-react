import classes from "../../styles/modals/LoginSignUp.module.css";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "../../forms/loginForm";
import { Link } from "react-router-dom";

interface Props {
  handleSelected: (selected: string) => void;
  type: string;
  selected: string;
}

export default function loginComponent({
  handleSelected,
  type,
  selected,
}: Props) {
  return (
    <AnimatePresence>
      {selected === type && (
        <motion.div
          key={"loginForm"}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          exit={{ x: "100%" }}
          className={`${classes.login}`}
        >
          {/* Title */}
          <div className={`${classes.header__container}`}>
            <h2 className={`${classes.header}`}>Login</h2>
          </div>

          {/* Form */}
          <div className={`${classes.form__container}`}>
            <LoginForm />
          </div>
          {/* Forgot Password */}
          <p className={`${classes.forgot_password}`}>
            Forgot your password? <Link to="/forgot-password">Reset</Link>
          </p>
          {/* Toggle */}
          <div className={`${classes.mobile_toggle}`}>
            <p>Don't have an account?</p>
            <button onClick={() => handleSelected("signup")}>Sign Up</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
