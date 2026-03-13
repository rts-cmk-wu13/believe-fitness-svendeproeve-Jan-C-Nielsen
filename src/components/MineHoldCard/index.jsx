import { getClass } from "@/lib/dal";
import Image from "next/image";
import Link from "next/link";

export function TilMeldteHoldCard({ name, weekday, time, hold_id }) {

    const holdlink = "/aktiviteter/" + hold_id;

    return (
        <section className="rounded-[24px] w-[370px] border p-[16px]  bg-white text-black mt-[27]  ">
            <h2></h2>
            <p className="text-[26px] mt-[10px]">{name}</p>
            <p className="text-[18px] mt-[10px]  mb-[24px]"><span className="mr-[10px]">{weekday}</span><span>- {time}</span></p>
            <section className="bg-white flex items-center justify-between w-full gap-4">
                <Link href={holdlink} className="rounded-full text-[14px] p-[9px_28px] font-semibold text-black  bg-[#F1C40E]" >SHOW CLASS</Link>
                <Link href={holdlink} className=" rounded-full text-[14px] p-[9px_28px] font-semibold text-black  bg-[#F1C40E]" >Leave</Link>
            </section>
        </section>
    )
}

export function MineHoldCard({ name, weekday, time, hold_id, maxParticipants, noParticipants }) {

    const deltagerlink = "/deltagerliste/" + hold_id;
 

    return (
        <section className="rounded-[24px] w-[370px] border p-[16px]  bg-white text-black mt-[27]  ">

            <p className="text-[24px] font-bold mt-[10px]">{name}</p>
            <p className="text-[16px] mt-[10px]  mb-[24px]"><span className="mr-[10px]">{weekday}</span><span>- {time}</span></p>
            <p className="flex text-[16px] mt-[10px]  mb-[24px]"><span className="mr-[20px]">Max. participants: {maxParticipants}</span><span className="ml-auto">Joined: {noParticipants}</span></p>
            <div className="flex">
                <Link href={deltagerlink} className=" rounded-full text-[14px] p-[9px_28px] font-semibold text-black  bg-[#F1C40E]" >Participants</Link>
                <Image className="ml-[95px]"
                    src="/lucide_edit.png"
                    alt="lucide_edit"
                    width={43}
                    height={43}
                    priority
                />
                <Image className=" rounded-full  ml-auto"
                    src="/garbagecan.png"
                    alt="garbagecan"
                    width={43}
                    height={43}
                    priority
                />
            </div>
        </section>
    )
}
