"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  return (
    <main className="fixed mx-auto w-[411px] inset-0  flex flex-col bg-white">
      
    
      <div className="flex justify-end p-6">
        <button onClick={() => router.back()} className="text-[24px] font-bold " >
          X
        </button>
      </div>

    
      <nav className="flex flex-col items-center justify-center flex-1 gap-8 text-[24px] ">
        <Link href="/home" className="hover:text-blue-600">
          Home
        </Link>

        <Link href="/aktiviteter" className="hover:text-blue-600">
          Popular classes
        </Link>

        <Link href="/search" className="hover:text-blue-600">
          Search
        </Link>

        <Link href="/profil" className="hover:text-blue-600">
          My Profile
        </Link>

        <Link href="/logout" className="hover:text-red-800">
          Log Out
        </Link>
      </nav>
    </main>
  );
}