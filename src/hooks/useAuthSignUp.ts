import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setIsAuthenticated, setRequireReAuth } from "../redux/utils/authSlice";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

type SignUpFormData = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  re_password: string;
};

export default function useAuthSignup() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const redirect = useNavigate();

  // Dev note, when we add in email confirmation
  // need to add in a step for the confirmation email intead of just authentication

  // Form data
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  async function signUpRequest() {
    const response = await axios.post(
      "/auth/create/",
      {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        re_password: re_password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  }

  const {
    mutate,
    isError,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: signUpRequest,
    onMutate: () => {
      console.log("Signing up");
    },
    onSuccess: (data) => {
      console.log(data);
      console.log("Signed up");
      dispatch(setIsAuthenticated(true));
      dispatch(setRequireReAuth(false));
      redirect("/dashboard");
    },
    onError: (error) => {
      console.log("Error signing up");
      console.log(error);
    },
  });

  const handleSignUp = (data: SignUpFormData) => {
    setEmail(data.email);
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setPassword(data.password);
    setRePassword(data.re_password);
    console.log(data);
    console.log("signing up...");
    //mutate();
  };

  return {
    handleSignUp,
    isLoading,
    isError,
    error,
  };
}

export type { SignUpFormData };
