import { getClass, getUser } from "@/lib/dal";
import Image from "next/image";
import Link from "next/link";

export default async function deltagerliste({ params }) {
    const id = (await params).id;

    const user = await getUser();
    console.log("user:" , user)
    const a = await getClass(id)

    console.log(a)
    return (
        <main className="p-4 flex-1 pb-24  bg-white w-[411px] m-[27] mx-auto ">
            <div className=" flex items-center justify-between w-full">
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


            <section className=" text-black rounded-[12px]  text-left p-[28px]">

                <h2 className="text-left mt-[24px] font-bold text-[24px] " > {a.className}</h2>
                <p className="mt-[20px]">Participants:</p>
                <ul>
                    {a.users.map( (u) => {
                        return (<li>
                            <p className="flex items-center gap-3 p-[10px_12px] bg-white text-black border rounded-full text-[18px] mt-[20px] mb-[24px]">
                                <Image
                                    src="/smallperson.png"
                                    alt="Person"
                                    width={20}
                                    height={20}
                                />
                                <span>{u.userFirstName} {u.userLastName}</span>
                            </p>
                        </li>
                        )
                    })}
                </ul>





            </section>

        </main>
    )
}
