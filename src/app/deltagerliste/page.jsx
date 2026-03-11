import { getActivitiesForInstructor, getUser } from "@/lib/dal";
//import Footer from "../../components/footer";
import Image from "next/image";
import Link from "next/link";

import MineHoldCard from "@/app/components/MineHoldCard";
import Footer from "../components/footer";

export default async function deltagerliste() {
    const user = await getUser();
    console.log(user)
    const ActivitiesForInstructor = await getActivitiesForInstructor()
    console.log(ActivitiesForInstructor)
    return (
        <main className="flex-1 pb-24  bg-[#003147] w-[411px] m-[27] mx-auto ">
            <h2 className=" text-[24px] text-white text-center p-[10px]">Min profil</h2>
            <section className="bg-white flex flex-col  items-center justify-center">
                <Image className="mt-[20px]"
                    src="/Person.png"
                    alt="Person"
                    width={64}
                    height={64}
                    priority
                />
                <p className=" text-[24px] mt-[10px]"><span className="mr-[10px]">{user.firstname}</span><span>{user.lastname}</span></p>
                <p className=" text-[18px]  mb-[18px] mt-[10px]">{user.role}</p>
            </section>



            <section className=" text-white rounded-[12px]  text-left p-[28px]">

                {ActivitiesForInstructor.map((a) => {
                    return (
                        <>
                            <h2 className="text-left mt-[24px] text-[24px] text-white  " > {a.name}</h2>
                            <p>Deltagere:</p>
                            {a.users.map((u) => {
                                return (<>
                                    <p className="flex items-center gap-3 p-[10px_12px] bg-white/50 text-black rounded-[10px] text-[18px] mt-[10px] mb-[24px]">
                                        <Image
                                            src="/smallperson.png"
                                            alt="Person"
                                            width={20}
                                            height={20}
                                        />
                                        <span>{u.firstname} {u.lastname}</span>
                                        <span className="ml-auto">{u.age} år</span>
                                    </p>
                                </>
                                )
                            })}

                        </>
                    )
                })}

            </section>
            <Footer />
        </main>
    )
}
