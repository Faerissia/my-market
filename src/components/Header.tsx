"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Guest from "../assets/guest.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; picture: string } | null>(
    null
  );

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="h-[80px] bg-white justify-between flex text-center">
      <div className="mt-4 ml-2">
        <Link href="/">
          <Image src={Logo} alt="" width={50} height={24} />
        </Link>
      </div>
      <div className="flex gap-2 mr-3 mt-7">
        {user ? (
          <>
            <Link href="/profile" className="">
              <img
                className="rounded"
                src={
                  user?.picture
                    ? user.picture
                    : "https://secure.gravatar.com/avatar/0de72e2274be4b434c7f2bfeebcb0dc1?s=500&d=mm&r=g"
                }
                alt=""
                width={35}
              />
            </Link>
            <div className="text-black">{user?.email}</div>
            <div className="text-black">|</div>
            <div className="text-black" onClick={handleLogout}>
              <button>Logout</button>
            </div>
          </>
        ) : (
          <>
            <div className="text-black">
              <Link href="/login">Login</Link>
            </div>
            <div className="text-black">|</div>
            <div className="text-black">
              <Link href="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
