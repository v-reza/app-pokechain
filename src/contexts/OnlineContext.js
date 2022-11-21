import NotOnline from "@/components/NotOnline";
import { useRouter } from "next/router";
import { createContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import OnlineReducer from "./OnlineReducer";

const initalState = {
  isOnline: true,
};

export const OnlineContext = createContext(initalState);

export const OnlineContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OnlineReducer, initalState);
  const router = useRouter();
  const whitelistIncludesPath = ["/auth/login", "/auth/register"];

  const goOnline = () => {
    state.isOnline = true;
    dispatch({ type: "SET_ONLINE" });
  };

  const goOffline = () => {
    state.isOnline = false;
    dispatch({ type: "SET_OFFLINE" });
  };

  useEffect(() => {
    if (!whitelistIncludesPath.includes(router.pathname)) {
      state.isOnline =
        typeof navigator.onLine === "boolean" ? navigator.onLine : true;

      window.addEventListener("online", () => goOnline());
      window.addEventListener("offline", () => goOffline());
      return () => {
        window.removeEventListener("online", () => goOnline());
        window.removeEventListener("offline", () => goOffline());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isOnline, state, whitelistIncludesPath, router.pathname]);

  if (!state.isOnline && !whitelistIncludesPath.includes(router.pathname)) {
    return <NotOnline value={{ dispatch }} />;
  }

  return (
    <OnlineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OnlineContext.Provider>
  );
};
