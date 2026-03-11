import { getActivitiesForInstructor, getAllActivities, getUser } from "@/lib/dal";
//import Footer from "../../components/footer";
import Image from "next/image";
import Link from "next/link";

import { MineHoldCard, TilMeldteHoldCard } from "@/app/components/MineHoldCard";
import Footer from "../components/footer";
import { redirect } from "next/navigation";

export default async function profil() {
    const user = await getUser();
    console.log(user)

    if (!user)
        redirect("/");

    let activities = [];
    if (user.role === "instructor") {
        activities = await getActivitiesForInstructor();
        console.log(activities)
    }

    return (
        <main className="flex-1  bg-[#003147] w-[411px] m-[27] mx-auto ">
            <h2 className=" text-[24px] text-white text-center p-[10px]">Min profil</h2>
            <section className="bg-white flex flex-col  items-center justify-center">
                <Image className="mt-[20px]"
                    src="/Person.png"
                    alt="Person"
                    width={64}
                    height={64}
                    priority
                />
                <p className="mt-[10px]"><span className="mr-[10px]">{user.firstname}</span><span>{user.lastname}</span></p>
                <p className="mb-[24px] mt-[10px]">{user.role}</p>
            </section>

            <h2 className="mt-[27px] text-left ml-[27px] text-[27px] text-white font-semibold " >  {user.role === "instructor" ? "Mine hold" : "Tilmeldte hold"}</h2>

            <section className="  rounded-[12px]  text-left p-[10px]">
                {user.role === "instructor" ?

                    activities.map((activitie) => {
                        return (<MineHoldCard name={activitie.name} weekday={activitie.weekday} time={activitie.time} hold_id={activitie.id}
                            maxParticipants={activitie.maxParticipants} noParticipants={activitie.users.length} />)
                    })
                    :
                    user.activities.map((activitie) => {
                        return (<TilMeldteHoldCard name={activitie.name} weekday={activitie.weekday} time={activitie.time} hold_id={activitie.id} />)
                    })
                }
            </section>
           
        </main>
    )
}
