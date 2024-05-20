"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner/Spinner";
import { USER_AUTH_TOKEN } from "@/context/User";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSpinner, setIsSpinner] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSpinner(true);
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(USER_AUTH_TOKEN, "true");
      setIsSpinner(false);
      router.push("/picks"); // Redirect to admin page after successful login
    } catch (error) {
      setIsSpinner(false);
      console.error("Error logging in:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-[#1c1c21] h-screen flex justify-center items-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-2 items-center">
        <div className="flex gap-2">
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
        </div>
        <button
          type="submit"
          className="bg-[#066fd2] min-w-[100px] mt-5 rounded-[8px] px-5 py-1 text-[20px]"
        >
          {isSpinner ? <Spinner color="#1c1c21" textColor="#fff" /> : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
