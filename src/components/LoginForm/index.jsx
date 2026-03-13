"use client"

import { useActionState } from "react";
import { loginUser } from "./action";

import Link from "next/link";
import Image from "next/image";

const initialState = {
    values: {
        email: "",
        password: ""
    },
    errors: undefined
};

export default function LoginForm() {

    const [state, formAction, isPending] = useActionState(loginUser, initialState);

    return (

        <main className="mx-auto w-full bg-white">

            <h1 className="ml-[31px] text-[56px] font-bold mt-[40px] text-[#F1C40E] " >Believe</h1>
            <h1 className="ml-[31px] text-[56px] font-bold mb-[15px] text-[#F1C40E]" >Fitness</h1>
            <div className="flex items-center  mb-12 gap-2">
                <Image
                    className="w-[31px] h-[1px]"
                    src="/Line 51.png"
                    alt="Line 51.png"
                    width={31}
                    height={1}
                    unoptimized
                />
                <p className="text-[20px] font-bold text-black">
                    Train like a pro
                </p>
            </div>

            <div className="m-4 ">
                <h1 className="text-[20px] mb-4 font-bold text-black" >Log in with your credentials</h1>
                <form action={formAction} noValidate>
                    <div>
                        <div>
                            <input placeholder="Brugernavn" className="border rounded-full text-black bg-white p-[13] mb-[20px] w-full" type="text" name="email" defaultValue={state.values.email}></input>
                            {state.errors?.email && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.email}</p>}
                        </div>

                        <div>
                            <input placeholder="Password" className="border rounded-full text-black bg-white  p-[13] mb-[20px] w-full" type="password" name="password" defaultValue={state.values.password}></input>
                            {state.errors?.password && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.password}</p>}
                        </div>
                    </div>
                    {state.errors?.form && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.form}</p>}
                    <button type="submit" disabled={isPending} className="border rounded-full bg-[#F1C40E] w-full block mx-auto rounded-[10px] pt-[13px] pb-[13px] pr-[90px] pl-[90px] mb-[10px]  text-black ">{isPending ? "Logger ind..." : "Log ind"}</button>
                </form>
                <p className="text-center text-black mt-[20px] text-[14px] ">Are You not yet a Believer?</p>
                <Link className="block text-center text-black mt-[20px] text-[14px] pb-[100px]" href="/opretbruger">Sign up here to start training like a pro.</Link>
            </div>
        </main>
    )
}