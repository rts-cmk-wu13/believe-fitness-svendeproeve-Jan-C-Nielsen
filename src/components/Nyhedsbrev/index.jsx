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
        <section className="flex mb-[82px] text-black m-[27]  flex-col ">
            <h2  className=" mb-[24px] text-[36px] font-semibold " >Sign up for our newsletter</h2>
            <p  className="text-[18px] mb-[18px]">Sign up to receive the latest news and announcements from Believe Fitness</p>
            <form className = " text-[14px] text-black flex " action={formAction} noValidate>
                   <div>
                    <div>
                        <input   placeholder="Enter your email..." className = " p-[13] w-[255px] bg-white text-black mr-[27px]" type="email" name="email" defaultValue={state.values.email}></input>
                        {state.errors?.email && <p className="rounded-[24px] bg-[#ff0000] text-black  mb-8">{state.errors.email}</p>}
                    </div>

                </div>
                {state.errors?.form && <p>{state.errors.form}</p>}
                <button  type="submit" disabled={isPending} className="rounded-[24px] width-[60px] p-[12px] bg-[#F1C40E] ">{isPending ? "SIGNING UP..." : "SIGN UP"}</button> 
          </form>
        </section>
    )

}