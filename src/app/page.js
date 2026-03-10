"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Splash() {
  const images = ["/welcomecenter.png", "/welcomecenter2.png"];
  const bgImage = images[Math.floor(Math.random() * images.length)];

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto">
      <main className="relative mx-auto flex w-[411px] h-[812px] flex-col">

        <Image
          src={bgImage}
          alt="welcome background"
          fill
          className="object-cover"
          priority
        />

        <div className="relative z-10 flex flex-col justify-end h-full px-[31px] pb-[60px]">
          <h1 className="text-[56px] font-bold text-[#F1C40E]">Believe</h1>
          <h1 className="text-[56px] font-bold mb-[15px] text-[#F1C40E]">
            Fitness
          </h1>

          <div className="flex items-center mb-12 gap-2">
            <Image
              className="w-[31px] h-[1px]"
              src="/WhiteLine.png"
              alt="Line"
              width={31}
              height={1}
              unoptimized
            />
            <p className="text-[20px] font-bold text-white">
              Train like a pro
            </p>
          </div>

          <Link
            href="/home"
            className={`self-center w-[178px] h-[44px]  text-[14px] font-semibold text-black bg-[#F1C40E] rounded-full flex items-center 
              justify-center transition-all duration-500 ${
              showButton
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Start training
          </Link>
        </div>

      </main>
    </div>
  );
}