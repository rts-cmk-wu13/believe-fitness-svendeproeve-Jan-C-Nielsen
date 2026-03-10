"use client"

import Image from "next/image";
import DetSigerVoresKunderOmOsCard from "../DetSigerVoresKunderOmOsCard";
import { useState } from "react";

export default function Karusel({ vidnesbyrd }) {
    const len = vidnesbyrd.length;
    const [index, setIndex] = useState(0);

    return (
        <section className="mb-[82px] text-white flex justify-center">

            <div className="relative">

              
                <Image
                    src="/welcomecenter.png"
                    alt="welcomecenter.png"
                    fill
                    className="object-cover"
                    priority
                />

               
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">

                    <h3 className="text-[28px] font-semibold mb-2">
                        A word from<br />other Believers
                    </h3>

                    <DetSigerVoresKunderOmOsCard
                        bodytext={vidnesbyrd[index].text}
                        name={vidnesbyrd[index].name}
                        occupation={vidnesbyrd[index].occupation}
                    />

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <button onClick={() => setIndex(index === 0 ? len - 1 : index - 1)}>
                            <Image
                                src="/KeyboardArrowLeft.png"
                                alt="left"
                                width={43}
                                height={43}
                                priority
                            />
                        </button>

                        <button onClick={() => setIndex(index < len - 1 ? index + 1 : 0)}>
                            <Image
                                src="/KeyboardArrowRight.png"
                                alt="right"
                                width={43}
                                height={43}
                                priority
                            />
                        </button>
                    </div>

                </div>
            </div>

        </section>
    )
}