import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { createContext, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setDecodeUser } from "@/redux/action/userActions";
import { publicRequest } from "@/utils/axiosInstance";
import { useCookies } from "react-cookie";

const initalState = {
  access_token:
    typeof window !== "undefined" && localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : null,
  refresh_token:
    typeof window !== "undefined" && localStorage.getItem("refresh_token")
      ? localStorage.getItem("refresh_token")
      : null,
  isAuthenticated:
    typeof window !== "undefined" && localStorage.getItem("access_token")
      ? true
      : false,
};

export const AuthContext = createContext(initalState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initalState);
  const dispatchRedux = useDispatch();
  const [cookieIsAuth, setCookieIsAuth, removeCookieIsAuth] = useCookies([
    "isAuth",
  ]);
  const router = useRouter();

  useEffect(() => {
    const saveState = async () => {
      if (state?.access_token) {
        const expired = jwtDecode(state?.access_token).exp;
        const checkExpired =
          expired * 1000 < new Date().getTime() ? true : false;
        if (checkExpired) {
          const response = await publicRequest.get("/auth/token", {
            params: {
              refreshToken: state.refresh_token,
            },
          });

          const { accessToken } = response.data;
          localStorage.setItem("access_token", accessToken);
          const decodedUser = jwtDecode(accessToken);
          setDecodeUser(dispatchRedux, decodedUser);
        } else {
          const decodedUser = jwtDecode(state.access_token);
          setDecodeUser(dispatchRedux, decodedUser);
        }
        setCookieIsAuth("isAuth", true, {
          path: "/",
        });
        router.push("/");
        if (
          router.pathname !== "/auth/login" ||
          router.pathname !== "/auth/register"
        ) {
          setCookieIsAuth("isAuth", true, {
            path: "/auth/login",
          });
          setCookieIsAuth("isAuth", true, {
            path: "/auth/register",
          });
        }
      } else {
        removeCookieIsAuth("isAuth", {
          path: "/auth/login",
        });
        removeCookieIsAuth("isAuth", {
          path: "/auth/register",
        });
        removeCookieIsAuth("isAuth", {
          path: "/",
        });
      }
    };
    saveState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.access_token, state?.refresh_token]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
