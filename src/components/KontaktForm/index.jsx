"use client"

import { useActionState } from "react";
import { loginUser } from "./action";

const initialState = {
    values: {
        navn: "",
        email: "",
        besked: ""
    },
    errors: undefined
};

export default function KontaktForm() {

    const [state, formAction, isPending] = useActionState(loginUser, initialState);

    return (
        <main className=" text-white m-[27]  flex flex-col  sm:items-start sm:text-left">
            <h2  className="mb-[24] text-[36px]">Contact us</h2>
            <form className="w-full text-black block mx-auto  mb-[27] " action={formAction} noValidate>
                <div >
                    <div>
                        <input  className="bg-white mb-8 p-[13] w-full"  placeholder="Enter your name..." type="text" name="navn" defaultValue={state.values.navn}></input>
                        {state.errors?.navn && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.navn}</p>}
                    </div>
                    <div>
                        <input   className="bg-white  mb-8 p-[13]  w-full"  placeholder="Enter your email..." type="email" name="email" defaultValue={state.values.email}></input>
                        {state.errors?.email && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.email}</p>}
                    </div>
                    <div>
                        <textarea className="bg-white  mb-8 p-[13] w-full h-50" placeholder="Enter your Message..." type="text" name="besked" defaultValue={state.values.besked}></textarea>
                        {state.errors?.besked && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.besked}</p>}
                    </div>
                </div>
                {state.errors?.form && <p>{state.errors.form}</p>}
                <button type="submit" disabled={isPending} className="mx-auto block  rounded-[24px] pt-[13px] pb-[13px] pr-[90px] pl-[90px] bg-[#F1C40E]">{isPending ? "SENDING MESSAGE ..." : "SEND MESSAGE"}</button>
            </form>
        </main>
    )
}