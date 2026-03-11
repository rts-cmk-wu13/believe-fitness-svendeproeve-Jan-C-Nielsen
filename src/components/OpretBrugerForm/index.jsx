"use client"

import { useActionState } from "react";
import { loginUser } from "./action";
import Image from "next/image";


const initialState = {
    values: {
        fornavn: "",
        email: "",
       
        adgangskode: "",
        gentagadgangskode: ""
    },
    errors: undefined
};

export default function KontaktForm() {

    const [state, formAction, isPending] = useActionState(loginUser, initialState);

    return (
        <main className=" mx-auto w-full bg-white">

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
        
                    <h1 className="text-[20px] mb-4 font-bold text-black" >Sign up as a new user</h1>
            <form className="w-full text-black block mx-auto  mb-[27] " action={formAction} noValidate>
                <div >
                    <div>
                        <input className="border rounded-full bg-white  mb-8 p-[13]  w-full" placeholder="Enter your name..." type="text" name="fornavn" defaultValue={state.values.fornavn}></input>
                        {state.errors?.fornavn && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.fornavn}</p>}
                    </div>

                    <div>
                        <input className="border rounded-full bg-white  mb-8 p-[13]  w-full" placeholder="Enter your email..." type="email" name="email" defaultValue={state.values.email}></input>
                        {state.errors?.email && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.email}</p>}
                    </div>

                    <input className="border rounded-full bg-white  mb-8 p-[13]  w-full" placeholder="Enter your password..." type="password" name="adgangskode" defaultValue={state.values.adgangskode}></input>
                    {state.errors?.adgangskode && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.adgangskode}</p>}


                    <input className="border rounded-full bg-white  mb-8 p-[13]  w-full" placeholder="Repeat your password..." type="password" name="gentagadgangskode" defaultValue={state.values.gentagadgangskode}></input>
                    {state.errors?.gentagadgangskode && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.gentagadgangskode}</p>}

                </div>
                {state.errors?.form && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.form}</p>}
                <button type="submit" disabled={isPending} className="border rounded-full bg-[#F1C40E] w-full block mx-auto rounded-[10px] pt-[13px] pb-[13px] pr-[90px] pl-[90px] mb-[10px]  text-black ">{isPending ? "SIGNING UP..." : "SIGN UP"}</button>
             </form>
        </main>
    )
}