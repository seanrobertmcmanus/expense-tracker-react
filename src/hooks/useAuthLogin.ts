import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setIsAuthenticated, setRequireReAuth } from "../redux/utils/authSlice";
import axios from "../lib/axios";

import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const redirect = useNavigate();
  // Handlers
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  // Form
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

  const { mutate } = useMutation({
    mutationFn: loginRequest,
    onMutate: () => {
      console.log("Logging in");
      setIsLoading(true);
      setIsError(false);
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
      setIsError(true);
      console.log(error);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return {
    handleLogin,
    handleEmailChange,
    handlePasswordChange,
    isLoading,
    isError,
    error,
  };
}
