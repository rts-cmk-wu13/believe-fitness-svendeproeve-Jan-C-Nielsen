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
        <div className=" mx-auto  w-[411px] flex items-center justify-center">
            <main className="flex-1 pb-24  bg-[#003147]">

                <section className=" h-screen text-[36px] font-bold  relative text-white">
                    <Image
                        className="object-cover"
                        src="/welcome.jpg"
                        alt="welcome.jpg"
                        fill
                        priority
                    />
                    <div className=" absolute inset-0 flex flex-col items-center justify-center">


                    </div>
                </section>

                <h1 className="m-[27] text-[36px] font-semibold text-white">
                    News
                </h1>

                {News.map(async (n) => {
                    const pic = (await GetAsset(n.assetId)).url;
                    console.log(pic)
                    return <HoldtypeCard key={n.id} headline={n.title} pic={pic} bodytext={n.text} />
                })}


                <Nyhedsbrev />

                <Karusel vidnesbyrd={vidnesbyrd} />

                <KontaktForm />

                <section className="  mb-[24px] text-center  text-white" >


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
