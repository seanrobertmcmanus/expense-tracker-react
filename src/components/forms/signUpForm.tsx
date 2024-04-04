import { useState, useEffect } from "react";
import classes from "../styles/forms/signUpForm.module.css";
import useAuthSignup, { SignUpFormData } from "../../hooks/useAuthSignUp";
import { z, ZodType } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../inputs/formInputs/CTextInput";
import { AuthFormButton } from "../buttons/FormButtons";

export default function SignUpForm() {
  const { handleSignUp, isLoading, isError, error } = useAuthSignup();

  const [hasError, setHasError] = useState(false);

  const signUpSchema: ZodType<SignUpFormData> = z
    .object({
      email: z.string().email({ message: "Invalid email" }),
      first_name: z.string().min(1, "First name must be at least 2 characters"),
      last_name: z.string().min(1, "Last name must be at least 2 characters"),
      password: z.string().min(4, "Password must be at least 4 characters"),
      re_password: z.string(),
    })
    .refine((data) => data.password === data.re_password, {
      message: "Passwords do not match",
      path: ["re_password"], // path of error
    });

  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  // Error check & display

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
      <form onSubmit={handleSubmit(handleSignUp)} className={`${classes.form}`}>
        <TextInput
          label="Email"
          type="email"
          id="email"
          placeholder="Email"
          dark={true}
          errorEnabled={true}
          required={true}
        />
        <div className={`${classes.dual_input}`}>
          <TextInput
            label="First Name"
            type="text"
            id="first_name"
            placeholder="First Name"
            dark={true}
            errorEnabled={true}
            required={true}
          />
          <TextInput
            label="Last Name"
            type="text"
            id="last_name"
            placeholder="Last Name"
            dark={true}
            errorEnabled={true}
            required={true}
          />
        </div>

        <TextInput
          label="Password"
          type="password"
          id="password"
          placeholder="Password"
          dark={true}
          errorEnabled={true}
          required={true}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          id="re_password"
          placeholder="Password"
          dark={true}
          errorEnabled={true}
          required={true}
        />
        <div className={`${classes.button__container}`}>
          <AuthFormButton
            text="Sign Up"
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
