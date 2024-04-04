import { useState, useEffect } from "react";
import classes from "../styles/forms/loginForm.module.css";
import useAuthLogin, { LoginFormData } from "../../hooks/useAuthLogin";
import { z, ZodType } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../inputs/formInputs/CTextInput";
import { AuthFormButton } from "../buttons/FormButtons";

export default function LoginForm() {
  const { handleLogin, isLoading, isError } = useAuthLogin();

  const [hasError, setHasError] = useState(false);

  const loginSchema: ZodType<LoginFormData> = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isError || errors.email || errors.password) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [isError, errors]);

  return (
    <FormProvider {...methods}>
      {/* Error Message */}
      <div className={`${classes.error__wrapper}`}>
        {hasError && (
          <div className={`${classes.error_message}`}>
            <p>Invalid Email or Password</p>
          </div>
        )}
      </div>
      {/* Login Form */}
      <form onSubmit={handleSubmit(handleLogin)} className={`${classes.form}`}>
        <TextInput
          label="Email"
          type="email"
          id="email"
          placeholder="Email"
          dark={true}
        />
        <TextInput
          label="Password"
          type="password"
          id="password"
          placeholder="Password"
          dark={true}
        />
        <div className={`${classes.button__container}`}>
          <AuthFormButton
            text="Login"
            isLoading={isLoading}
            type="submit"
            iconPosition="right"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            }
          />
        </div>
      </form>
    </FormProvider>
  );
}
