import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setIsAuthenticated, setRequireReAuth } from "../redux/utils/authSlice";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

export default function useLogin() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const redirect = useNavigate();

  // Form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginRequest() {
    const response = await axios.post(
      "/auth/login/",
      { email: email, password: password },
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
    mutationFn: loginRequest,
    onMutate: () => {
      console.log("Logging in");
    },
    onSuccess: (data) => {
      console.log(data);
      console.log("Logged in");
      dispatch(setIsAuthenticated(true));
      dispatch(setRequireReAuth(false));
      redirect("/dashboard");
    },
    onError: (error) => {
      console.log("Error logging in");
      console.log(error);
    },
  });

  const handleLogin = (data: LoginFormData) => {
    setEmail(data.email);
    setPassword(data.password);
    console.log(email);
    console.log(password);
    console.log("logging in...");
    mutate();
  };

  return {
    handleLogin,
    isLoading,
    isError,
    error,
  };
}

export type { LoginFormData };
