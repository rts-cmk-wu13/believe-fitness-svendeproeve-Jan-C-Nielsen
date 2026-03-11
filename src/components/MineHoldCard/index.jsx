import Image from "next/image";
import Link from "next/link";

export function TilMeldteHoldCard({ name, weekday, time, hold_id }) {

    const holdlink = "/aktiviteter/" + hold_id;

    return (
        <section className="rounded-[10px] p-[16px]  bg-white/80 text-black m-[27]  ">
            <h2></h2>
            <p className="text-[26px] mt-[10px]">{name}</p>
            <p className="text-[18px] mt-[10px]  mb-[24px]"><span className="mr-[10px]">{weekday}</span><span>Kl.{time}</span></p>
            <Link href={holdlink} className="rounded-[10px] text-[18px] p-[9px_28px] text-white  bg-black" >Vis hold</Link>
        </section>
    )
}

export function MineHoldCard({ name, weekday, time, hold_id, maxParticipants, noParticipants }) {

    const deltagerlink = "/deltagerliste";

    return (
        <section className="rounded-[10px] p-[16px]  bg-white/80 text-black m-[27]  ">

            <p className="text-[26px] mt-[10px]">{name}</p>
            <p className="text-[18px] mt-[10px]  mb-[24px]"><span className="mr-[10px]">{weekday}</span><span>Kl.{time}</span></p>
            <p className="flex text-[18px] mt-[10px]  mb-[24px]"><span className="mr-[20px]">Max. deltagere: {maxParticipants}</span><span className="ml-auto">Tilmeldte: {noParticipants}</span></p>
            <div className="flex"><Link href={deltagerlink} className=" bg-[#003147] rounded-[10px] text-[18px] p-[9px_28px] text-white" >Deltagerliste</Link>
                <Image className="ml-[55px]"
                    src="/lucide_edit.png"
                    alt="lucide_edit"
                    width={43}
                    height={43}
                    priority
                />
                <Image className="p-[5px] rounded-[10px] bg-[#003147] ml-auto"
                    src="/garbagecan.png"
                    alt="garbagecan"
                    width={38}
                    height={38}
                    priority
                />
            </div>
        </section>
    )
}
