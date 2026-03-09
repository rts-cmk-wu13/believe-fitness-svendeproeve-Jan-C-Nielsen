"use client"

import { useActionState } from "react";
import { loginUser } from "./action";

import Link from "next/link";

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

        <main className="mx-auto">
        
            <h1 className="text-[36px] mt-[40px] mb-[36px] " >Log ind</h1>

            <form action={formAction} noValidate>
                <div>
                    <div>
                        <input placeholder="Brugernavn" className="text-black bg-white p-[13] mb-[10px] w-full" type="text" name="email" defaultValue={state.values.email}></input>
                        {state.errors?.email && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.email}</p>}
                    </div>

                    <div>
                        <input placeholder="Password" className="text-black bg-white  p-[13] mb-[10px] w-full" type="password" name="password" defaultValue={state.values.password}></input>
                        {state.errors?.password && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.password}</p>}
                    </div>
                </div>
                {state.errors?.form && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.form}</p>}
                <button type="submit" disabled={isPending} className="block mx-auto rounded-[10px] pt-[13px] pb-[13px] pr-[90px] pl-[90px] mb-[10px]  text-black bg-white">{isPending ? "Logger ind..." : "Log ind"}</button>
            </form>
            <p className="text-center mt-[20px] text-[18px] pb-[100px]">Er du endnu ikke bruger? <Link href="/opretbruger">Opret dig her.</Link></p>
        </main>
    )
}