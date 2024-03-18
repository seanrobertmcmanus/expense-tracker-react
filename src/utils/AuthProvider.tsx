import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// Axios
import useAxiosAuth from "../hooks/useAxiosAuth";

import { RootState } from "../redux/store";
// Auth
import useAuthRefresh from "../hooks/useAuthRefresh";

interface AuthContext {
  children: React.ReactNode;
}

// Verify the user's access token is still valid
export async function verifyAuth() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/verify/`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  return response.json();
}

// Authentication Provider (control)
export default function AuthProvider({ children }: AuthContext) {
  const queryClient = useQueryClient();
  const { mutate } = useAuthRefresh();
  const { requireReAuth } = useSelector((state: RootState) => state.auth);

  const authAxios = useAxiosAuth();
  async function verifyAuth() {
    const response = await authAxios.post("/auth/verify/");
    return response.data;
  }

  // Verify User access token
  const { data: verifyData, isFetching } = useQuery({
    queryKey: ["authVerify"],
    queryFn: verifyAuth,
    enabled: !requireReAuth,
    refetchInterval: 1000 * 30, // 30 seconds
  });

  // Refresh the user's access token if it has expired
  useEffect(() => {
    if (verifyData && !verifyData.data.auth) {
      console.log("User access token expired - refreshing token");
      mutate();
    }
  }, [verifyData, isFetching]);

  return <>{children}</>;
}
