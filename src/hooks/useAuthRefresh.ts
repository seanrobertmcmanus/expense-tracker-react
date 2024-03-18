import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setIsAuthenticated, setRequireReAuth } from "../redux/utils/authSlice";

// Refresh the user's access token
export async function refreshAuth() {
  const request = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/refresh/`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (!request.ok) {
    throw new Error("Refresh Token Expired");
  }
  return request.json();
}

// Q: What is the purpose of this hook?
// A: This hook is used to refresh the user's access token. It is used to verify the user's authentication status and to refresh the user's access token if it has expired.
export default function useAuthRefresh() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Verify User Authentication, if requireReAuthentication is false
  const { mutate } = useMutation({
    mutationFn: refreshAuth,
    onSuccess: () => {
      dispatch(setIsAuthenticated(true));
      dispatch(setRequireReAuth(false));
    },
    onError: () => {
      dispatch(setIsAuthenticated(false));
      dispatch(setRequireReAuth(true));
    },
  });

  return { mutate };
}
