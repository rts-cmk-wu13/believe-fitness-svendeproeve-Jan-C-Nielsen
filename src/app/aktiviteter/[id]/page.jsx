
import { GetAverageRating, getClass, GetTrainer, isUserInstructor, isUserRegistered } from "@/lib/dal";
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


export default async function aktiviteter({ params }) {


    const id = (await params).id;
    console.log("id " + id)
    const aktivitet = await getClass(id);
    console.log(aktivitet)
    const imageurl = aktivitet.asset.url;
    const trainer = await GetTrainer(id)
  const avgrating = await GetAverageRating(aktivitet.id);
    // const UserRegistered = await isUserRegistered(aktivitet)
    // console.log("UserRegistered:" + UserRegistered)


    return (
        <main className="flex-1 absolute inset-0 bg-[#003147] w-[411px] mx-auto flex flex-col items-center bg-white font-[16px] text-left text-black">
            <div className="relative w-full h-[404px] mb-[30px] overflow-hidden ">
                <Image
                    src={imageurl}
                    alt={aktivitet.asset.url}
                    fill
                    className="object-cover"
                    unoptimized
                />

                <div className="absolute bottom-0 left-0 w-full text-[#F1C40E] p-4 flex flex-col gap-2">

                    <h2 className="text-[24px] mb-6 font-bold">{aktivitet.className}</h2>
                    <div className="flex items-center justify-between">
                        <p>{renderStars(avgrating)}</p>
                        <button className="px-4 py-2 w-[109px] border border-[#F1C40E] text-[#F1C40E] rounded-full ">
                            Rate
                        </button>

                    </div>
                </div>
            </div>

            <div className="text-left ">
                <p className="mb-4 ">
                    {aktivitet.classDay} {aktivitet.classTime}
                </p>
                <p>{aktivitet.classDescription}</p>

                <h2 className="mt-8 mb-4 font-bold font-[20px]">Trainer</h2>

                <div className="flex gap-4 items-center" >
                    <Image
                        src={trainer.asset.url}
                        alt={trainer.asset.url}
                        width={88}
                        height={88}
                        className=""
                        unoptimized
                    />
                    <p className="font-bold">{trainer.trainerName}</p>
                </div>
                
                <button className="px-4 py-2 w-full mt-4 bg-[#F1C40E] text-black rounded-full ">
                    SIGN UP
                </button>
            </div>



        </main>

    )
}