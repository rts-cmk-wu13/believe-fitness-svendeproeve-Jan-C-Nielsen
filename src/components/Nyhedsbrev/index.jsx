"use client"

import { useActionState } from "react";
import { loginUser } from "./action";


const initialState = {
    values: {
        email: "",

    },
    errors: undefined
};

export default function Nyhedsbrev() {

    const [state, formAction, isPending] = useActionState(loginUser, initialState);

    return (
        <section className="flex mb-[82px] text-white m-[27]  flex-col ">
            <h2  className=" mb-[24px] text-[36px] font-semibold " >Nyhedsbrev</h2>
            <p  className="text-[18px] mb-[18px]">Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>
            <form className = "  text-white flex " action={formAction} noValidate>
                   <div>
                    <div>
                        <input   placeholder="Email" className = " p-[13] w-[255px] bg-white text-black mr-[27px]" type="email" name="email" defaultValue={state.values.email}></input>
                        {state.errors?.email && <p className="bg-[#ff0000] text-white  mb-8">{state.errors.email}</p>}
                    </div>

                </div>
                {state.errors?.form && <p>{state.errors.form}</p>}
                <button  type="submit" disabled={isPending} className="bg-white p-[11px] text-black  rounded-[10px] ">{isPending ? "Opretter..." : "Tilmeld"}</button> 
          </form>
        </section>
    )

}