"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserContext } from "./useContext";
import Spinner from "@/components/Spinner/Spinner";

export type UserProvide = {
  password: string;
  email: string;
  user: boolean;
  isSpinner: boolean;
  setIsEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setUser: (val: boolean) => void;
  setIsSpinner: (val: boolean) => void;
};

export type UserProviderProps = {
  children: React.ReactNode;
};

export const USER_AUTH_TOKEN = "USER_AUTH_TOKEN";

export const UserProvider = ({ children }: UserProviderProps) => {
  const router = useRouter();
  const path = usePathname();
  const [email, setIsEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<boolean>(false);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = sessionStorage.getItem(USER_AUTH_TOKEN);
      console.log(userToken, "user token");

      if (userToken) {
        setUser(true);
        setIsSpinner(true);
        router.push(path || "/");
        setTimeout(() => {
          setIsSpinner(false);
        }, 1500);
      } else {
        router.push("/login");
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        password,
        setPassword,
        email,
        setIsEmail,
        user,
        setUser,
        isSpinner,
        setIsSpinner,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
