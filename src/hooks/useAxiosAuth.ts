import { authAxios } from "../lib/axios";
import { useEffect }  from "react";
import useAuthRefresh from "./useAuthRefresh";

export default function useAxiosAuth() {
    const { mutate } = useAuthRefresh();
    // Intercept the response and refresh the token if it's expired
    useEffect(() => {
        const responseInterceptor = authAxios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    mutate();
                    return authAxios(originalRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            authAxios.interceptors.response.eject(responseInterceptor);
        };
    }, [mutate]);
    
    return authAxios;
}
