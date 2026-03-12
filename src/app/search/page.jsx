import Image from "next/image";

import { saveMessage } from "./actions";
import { getAllClasses, GetAverageRating } from "@/lib/dal";
import Link from "next/link";


function renderStars(rating) {
    const stars = Math.floor(rating);

    return (
        <>
            {stars > 0 ? "★".repeat(stars) : "☆"}
        </>
    );
}

export default async function SearchPage({ searchParams }) {

    const searchstr = searchParams != null ? (await searchParams).searchstr : "";

    const aktiviteter = await getAllClasses(searchstr);
    console.log(aktiviteter)

    return (
        <div>
            <div className="mx-auto flex items-center justify-between w-[411px]">
                <div  className="flex items-center">
                    <Link
                        href="/home"
                        className="p-[21px]"
                    >
                        <Image
                            src="/arrowLeftBlack.png"
                            alt="arrowleftBlack.png"
                            width={21}
                            height={15}
                            priority
                        />

                    </Link>
                    <h2 className=" text-[24px] text-black text-left p-[10px]">Search</h2>
                </div>
                <Link
                    href="/navigation"
                    className=" "
                >
                    <Image
                        src="/MenuGrey.png"
                        alt="MenuGrey.png"
                        width={21}
                        height={15}
                        priority
                    />

                </Link>
            </div>
            <form
                action={saveMessage}
                className="mx-auto max-w-md  p-6 "
            >
                <div className="relative">
                    <input
                        name="message"
                        placeholder="Search classes"
                        className="w-full border rounded-full px-4 py-3 pr-12 text-black placeholder-gray-400 focus:bg-[#C4C4C4] "
                    />

                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        <Image className=" rounded-[39px_39px_0px_39px]"
                            src="/search.png"
                            alt="Search"
                            fill
                            unoptimized
                        ></Image>
                    </button>
                </div>
            </form>

            {aktiviteter.length > 0 ?
                (<section className="mx-auto max-w-md  p-6 ">
                    <h2 className="text-center text-[20px] font-bold w-full ">Search results</h2>

                    <ul className="mx-auto p-6 flex flex-col items-center gap-5 ">
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
                </section>)
                :
                (<p className="text-center text-[36px] font-bold ">No search results</p>)}
        </div>
    );
}