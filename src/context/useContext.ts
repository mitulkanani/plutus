import { createContext, useContext } from "react";
import { UserProvide } from "./User";

export const UserContext = createContext<UserProvide>({
    password: "",
    email: "",
    setPassword: () => { },
    setIsEmail: () => { },
    user: false,
    setUser: () => { },
    isSpinner: false,
    setIsSpinner: () => { },
})

export const useUser = () => {
    return useContext(UserContext);
};