"use client";

import { useEffect, useState } from "react";
import accountService from "../../service/api/account";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import google from "@/assets/google.svg";
import Image from "next/image";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/service/firebase";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {});

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please provide both email and password");
      return;
    }

    const login: any = await accountService.login(email, password);
    if (login.results) {
      sessionStorage.setItem("token", login.results);
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } else {
      setErrorMessage("Incorrect Email or Password");
      return;
    }

    setPassword("");
    setErrorMessage("");
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user: any = result.user;

    const login: any = await accountService.googleAuth(user.accessToken);
    console.log(login);
    if (login.results) {
      sessionStorage.setItem("token", login.results);
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } else {
      setErrorMessage("Incorrect Email or Password");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-black"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="border-b border-gray-400 my-6"></div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex mx-auto"
          onClick={handleGoogleLogin}
        >
          <Image
            className="bg-white rounded"
            src={google}
            alt=""
            width={28}
            height={15}
          />
          <span className="ml-3 mt-0.5">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
