import classes from "../styles/buttons/AuthButton.module.css";
import ButtonSpinner from "../loaders/spinners/buttonSpinner";

interface AuthButtonProps {
  text: string;
  isLoading?: boolean;
  type: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
}

// Authentication Based Form Buttons
const AuthFormButton = ({
  text,
  isLoading,
  type,
  icon,
  iconPosition,
  disabled,
}: AuthButtonProps) => {
  const buttonText = () => {
    if (icon && iconPosition === "left") {
      return (
        <div className={`${classes.button__content}`}>
          {icon}
          <span>{text}</span>
        </div>
      );
    } else if (icon && iconPosition === "right") {
      return (
        <div className={`${classes.button__content}`}>
          <span>{text}</span>
          {icon}
        </div>
      );
    } else {
      return <span>{text}</span>;
    }
  };

  return (
    <div className={`${classes.button__wrapper}`}>
      <button
        className={
          isLoading ? `${classes.button__loader}` : `${classes.button}`
        }
        type={type}
        disabled={isLoading || disabled}
      >
        {isLoading ? <ButtonSpinner /> : buttonText()}
      </button>
    </div>
  );
};

export { AuthFormButton };
