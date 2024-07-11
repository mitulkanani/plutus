"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner/Spinner";
import { USER_AUTH_TOKEN } from "@/context/User";
import { useUser } from "@/context/useContext";
import Image from "next/image";

type SetActiveType = React.Dispatch<React.SetStateAction<boolean>>;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const handleFocus = (setActive: SetActiveType) => {
    setActive(true);
  };

  const handleBlur = (value: string, setActive: SetActiveType) => {
    setActive(value !== "");
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSpinner(true);
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem(USER_AUTH_TOKEN, "true");
      router.push("/picks"); // Redirect to admin page after successful login
      setUser(true);
      setIsSpinner(false);
    } catch (error) {
      setIsSpinner(false);
      console.error("Error logging in:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-[#000] h-screen flex justify-center items-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-2 items-center">
        {/* <div className="flex gap-2">
          <label className="text-[20px] font-inter min-w-[105px]">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 text-black text-[16px] font-inter py-2 rounded-[7px]"
          />
        </div>
        <div className="flex gap-2">
          <label className="text-[20px] font-inter min-w-[105px]">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 text-black text-[16px] font-inter py-2 rounded-[7px]"
          />
        </div> */}
        <div className="flex flex-col items-center w-[400px] bg-[#1c1c21] drop-shadow-profileImageShadow rounded-3xl pb-9">
          <div>
            <Image
              src={"/images/brandlogo.png"}
              alt="brand logo"
              width={250}
              height={250}
              className=""
            />
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="text-[#e0dcbb] text-4xl tracking-normal font-inter font-medium">
                Welcome
              </div>
              <span className="font-normal text-xl">
                Login in to your account to continue
              </span>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 relative">
                <label
                  className={`text-[20px] left-[14px] z-[999] text-black input-label absolute font-inter ${
                    isEmailActive ? "active" : ""
                  }`}
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus(setIsEmailActive)}
                  onBlur={() => handleBlur(email, setIsEmailActive)}
                  required
                  className="px-[14px] pt-[26px] pb-[6px] w-full text-black text-[16px] font-inter py-2 rounded-[7px]"
                />
              </div>
              <div className="flex gap-2 relative">
                <label
                  className={`text-[20px] left-[14px] z-[999] input-label text-black absolute font-inter min-w-[105px] ${
                    isPasswordActive ? "active" : ""
                  }`}
                >
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus(setIsPasswordActive)}
                  onBlur={() => handleBlur(password, setIsPasswordActive)}
                  required
                  className="px-[14px] pt-[26px] pb-[6px] w-full text-black text-[16px] font-inter py-2 rounded-[7px]"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#066fd2] mt-10 rounded-[8px] px-10 py-3 text-[20px] font-medium"
          >
            {isSpinner ? (
              <Spinner color="#1c1c21" textColor="#fff" />
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
