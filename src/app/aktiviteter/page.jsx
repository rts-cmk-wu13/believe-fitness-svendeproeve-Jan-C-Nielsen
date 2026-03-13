
import { GetAverageRating, getAllClasses } from "@/lib/dal";

import Image from "next/image";
import Link from "next/link";

function renderStars(rating) {
    const stars = Math.floor(rating);

    return (
        <>
            {stars > 0 ? "★".repeat(stars) : "☆"}
        </>
    );
}

export default async function aktiviteter() {

    const aktiviteter = await getAllClasses();
    console.log(aktiviteter)

    const randomAktivitet = aktiviteter[Math.floor(Math.random() * aktiviteter.length)];
    const randomavgrating = await GetAverageRating(randomAktivitet.id);

    return (
        <main className="flex-1 pb-24 bg-white w-[411px] mx-auto flex flex-col items-center justify-center text-black">
            <div className="flex items-center justify-between w-full">

                <h1 className="ml-[27px] text-[24px]">
                    Popular classes
                </h1>

                <Link href="/navigation" className="pr-4">
                    <Image
                        src="/MenuGrey.png"
                        alt="MenuGrey.png"
                        width={21}
                        height={15}
                        priority
                    />
                </Link>

            </div>
            {randomAktivitet && (
                <div className="relative w-[370px] h-[404px] mb-[30px]">
                    <Image
                        src={randomAktivitet.asset.url}
                        alt={randomAktivitet.className}
                        fill
                        className="object-cover rounded-[16px]"
                        unoptimized
                    />

                    <div className="absolute bottom-0 left-0 w-[224px] text-black bg-[#F1C40E] p-4 text-[16px] rounded-[0px_16px_0px_16px]">
                        <p>{randomAktivitet.className}</p>
                        <p>{renderStars(randomavgrating)}</p>
                    </div>
                </div>
            )}


            <h2 className="ml-[27] text-[20px] font-bold self-start w-full text-left">Classes for You</h2>
            <ul className="flex gap-5 w-full overflow-x-auto  px-4 ">
                {aktiviteter.map(async (aktivitet) => {
                    const imageurl = aktivitet.asset.url;
                    const url = "/aktiviteter/" + aktivitet.id;
                    const avgrating = await GetAverageRating(aktivitet.id);

                    return (
                        <li key={aktivitet.id} className="flex-shrink-0 ">
                            <Link href={url}>
                                <div className="relative mb-[20px] w-[128px]">
                                    <Image
                                        className="rounded-[16px] w-[128px] h-[145px] object-cover"
                                        src={imageurl}
                                        alt={aktivitet.className}
                                        width={128}
                                        height={145}
                                        unoptimized
                                    />
                                    <div className="text-[12px] absolute bottom-0 left-0 w-full text-black bg-[#F1C40E] p-3 rounded-[0px_16px_0px_16px]">
                                        <p>{aktivitet.className}</p>
                                        <p>{renderStars(avgrating)}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>

        </main>

    )

}