import { OnlineContext } from "@/contexts/OnlineContext";
import { useContext } from "react";

const useOnline = () => useContext(OnlineContext);

export default useOnline;