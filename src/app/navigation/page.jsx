"use client";

import { isUserLoggedIn } from "@/components/LogoutForm/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const result = await isUserLoggedIn();
      setLoggedIn(result);
    }
    checkLogin();
  }, []);

  return (
    <main className="fixed mx-auto w-[411px] inset-0 flex flex-col bg-white">
      
      <div className="flex justify-end p-6">
        <button
          onClick={() => router.back()}
          className="text-[24px] font-bold"
        >
          X
        </button>
      </div>

      <nav className="flex flex-col items-center justify-center flex-1 gap-8 bg-white text-[24px]">
        <Link href="/home" className="hover:text-blue-600">
          Home
        </Link>

        <Link href="/aktiviteter" className="hover:text-blue-600">
          Popular classes
        </Link>

        <Link href={ `/search?searchstr=""`} className="hover:text-blue-600">
          Search
        </Link>

        <Link href="/profil" className="hover:text-blue-600">
          My Profile
        </Link>

        {loggedIn ? (
          <Link className="hover:text-blue-600" href="/logout">
            Log out
          </Link>
        ) : (
          <Link className="hover:text-blue-600" href="/login">
            Log in
          </Link>
        )}
      </nav>
    </main>
  );
}