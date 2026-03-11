import { getActivitiesForInstructor, getAllActivities, getUser } from "@/lib/dal";

import Image from "next/image";
import Link from "next/link";

import { MineHoldCard, TilMeldteHoldCard } from "@/components/MineHoldCard";

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
        <main className="flex-1 p-[20px] bg-white w-[411px] m-[27] mx-auto ">
            <div className="flex items-center justify-between w-full">
                <h2 className=" text-[24px] text-black text-left p-[10px]">My Profile</h2>

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
            <section className="bg-white flex items-center gap-4">
                <Image
                    src="/SmallPerson.png"
                    alt="Person"
                    width={64}
                    height={64}
                    priority
                />

                <div className="flex flex-col">
                    <p>
                        <span className="mr-2">{user.userFirstName}</span>
                        <span>{user.userLastName}</span>
                    </p>
                    <p>{user.role}</p>
                </div>
            </section>


            <section className=" ">
                {user.role === "instructor" ?

                    activities.map((activitie) => {
                        return (<MineHoldCard name={activitie.name} weekday={activitie.weekday} time={activitie.time} hold_id={activitie.id}
                            maxParticipants={activitie.maxParticipants} noParticipants={activitie.users.length} />)
                    })
                    :
                    user.classes.map((activitie) => {
                        return (<TilMeldteHoldCard name={activitie.className} weekday={activitie.classDay} time={activitie.classTime} hold_id={activitie.id} />)
                    })
                }
            </section>

        </main>
    )
}
