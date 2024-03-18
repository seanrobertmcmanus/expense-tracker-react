import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/utils/authSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";

interface UserInfo {
  email: string;
  displayName: string;
}

export default function useGetUserInfo() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const authAxios = useAxiosAuth();

  async function request() {
    const response = await authAxios.get("/auth/u/info");
    return response.data;
  }

  const { data, error, refetch } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: request,
    enabled: false,
  });

  // Get User Info From Backend

  //
  const getUserInfo = () => {
    refetch();
    console.log(data);  
  }

  return { getUserInfo };
}
