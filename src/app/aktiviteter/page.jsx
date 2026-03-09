
import { GetAverageRating, getAllClasses } from "@/lib/dal";

import Image from "next/image";
import Link from "next/link";


export default async function aktiviteter({ searchParams }) {

    const searchstr = searchParams != null ? (await searchParams).searchstr : null;

    const aktiviteter = await getAllClasses(searchstr);
    console.log(aktiviteter)

    return (
        <main className="flex-1 pb-24 bg-[#003147] w-[411px] mx-auto flex flex-col items-center justify-center text-white">

            <h2 className="ml-[27] text-[36px] self-start w-full text-left">Classes for You</h2>
            <ul>
                {aktiviteter.map(async (aktivitet) => {
                    const imageurl = aktivitet.asset.url;
                    const url = "/aktiviteter/" + aktivitet.id;
                    const avgrating = await GetAverageRating(aktivitet.id)
                    console.log(avgrating)
                    return (
                        <div className="flex  items-center justify-center">
                            <li key={aktivitet.id}>
                                <Link href={url}>
                                    <div className="relative mb-[20px]">
                                        <Image className=" rounded-[39px_39px_0px_39px]" src={imageurl}
                                            alt={aktivitet.asset.url}
                                            width={80}
                                            height={17}
                                            unoptimized
                                        ></Image>
                                        <div className="text-[12px] absolute bottom-0 left-0 w-full text-white bg-black/60 p-3 rounded-[0px_39px_0px_39px]">
                                            <p className="">  {aktivitet.className}</p>
                                            <p>{avgrating}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </div>
                    );
                })}
            </ul>

        </main>

    )

}