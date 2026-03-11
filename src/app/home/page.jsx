import Image from "next/image";

import KontaktForm from "@/components/KontaktForm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GetAsset, GetNews, getTestimonials } from "@/lib/dal";
import HoldtypeCard from "@/components/HoldtypeCard";
import Karusel from "@/components/Karusel";
import Nyhedsbrev from "@/components/Nyhedsbrev";

//import { isUserLoggedIn } from "./components/LogoutForm/action";

export default async function Home() {

    console.log(" home");
    const News = await GetNews();

    const vidnesbyrd = await getTestimonials();
    console.log(vidnesbyrd)

    return (
        <div className=" mx-auto  w-[410px] ">
            <main className=" bg-white">

                <section className=" text-[36px] font-bold  relative text-black">
                    <Image className="w-[410px] h-[324px]"
                        src="/welcome.jpg"
                        alt="welcome.jpg"
                        width={410}
                        height={324}
                        priority
                    />
                    <div className=" absolute inset-0 flex flex-col ">
                        <Link
                            href="/navigation"
                            className="flex justify-end p-[21px]"
                        >
                            <Image
                                src="/Menu.png"
                                alt="Menu.png"
                                width={21}
                                height={15}
                                priority
                            />

                        </Link>
                        <h2 className="m-[20px] text-[36px] font-semibold text-[#F1C40E]">Welcome to <br></br> Belive Fitness</h2>
                        <div className="m-[20px] text-[14px] font-semibold  flex gap-5">
                            <Link className="rounded-[24px] p-[12px] bg-[#F1C40E]" href="/aktiviteter">CLASSES</Link>
                            <Link className="rounded-[24px] p-[12px] bg-[#F1C40E]" href="/login">LOG IN</Link>
                        </div>
                    </div>
                </section>

                <h1 className="m-[20px] text-[56px] font-semibold text-[#F1C40E]">
                    News
                </h1>

                {News.map(async (n) => {
                    const pic = n.asset.url;
                    console.log(pic)
                    return <HoldtypeCard key={n.id} headline={n.title} pic={pic} bodytext={n.text} />
                })}


                <Nyhedsbrev />

                <Karusel vidnesbyrd={vidnesbyrd} />

                <KontaktForm />

                <section className="  mb-[24px] text-center  text-black" >


                    <h2 className="mt-[24px]  font-semibold text-[24px] ">Believe Fitness</h2>
                    <p>Train like a pro</p>
                    <p className=" text-[18px] ">Rabalderstræde 48  4000 Roskilde</p>
                    <p className=" text-[18px] ">Tlf. 3540 4550</p>
                    <p>hello@believe-fitness.com</p>
                </section>

            </main>
        </div>
    );
}
