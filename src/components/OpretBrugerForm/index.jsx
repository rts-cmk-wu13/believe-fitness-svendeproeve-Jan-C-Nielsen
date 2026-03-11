"use client"

import { useActionState } from "react";
import { loginUser } from "./action";


const initialState = {
    values: {
        fornavn: "",
        efternavn: "",
        brugernavn: "",
        alder: "",
        adgangskode: "",
        gentagadgangskode: ""
    },
    errors: undefined
};

export default function KontaktForm() {

    const [state, formAction, isPending] = useActionState(loginUser, initialState);

    return (
        <main className=" text-white m-[27]  flex flex-col  sm:items-start sm:text-left">
           
            <h2  className="text-[36px]">Opret bruger</h2>
            <form className="w-full text-black block mx-auto  mb-[27] " action={formAction} noValidate>
                <div >
                    <div>
                        <input  className="bg-white mb-8 p-[13] w-full"  placeholder="Fornavn" type="text" name="fornavn" defaultValue={state.values.fornavn}></input>
                        {state.errors?.fornavn && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.fornavn}</p>}
                    </div>
                    <div>
                        <input  className="bg-white mb-8 p-[13] w-full"  placeholder="Efternavn" type="text" name="efternavn" defaultValue={state.values.efternavn}></input>
                        {state.errors?.efternavn && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.efternavn}</p>}
                    </div>
                    <div>
                        <input  className="bg-white mb-8 p-[13] w-full"  placeholder="Brugernavn" type="text" name="brugernavn" defaultValue={state.values.brugernavn}></input>
                        {state.errors?.brugernavn && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.brugernavn}</p>}
                    </div>
                    <div>
                        <input  className="bg-white mb-8 p-[13] w-full"  placeholder="Alder" type="text" name="alder" defaultValue={state.values.alder}></input>
                        {state.errors?.alder && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.alder}</p>}
                    </div>
                   
                        <input className="bg-white  mb-8 p-[13] w-full" placeholder="Adgangskode" type="password" name="adgangskode" defaultValue={state.values.adgangskode}></input>
                        {state.errors?.adgangskode && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.adgangskode}</p>}
                    
                  
                        <input className="bg-white  mb-8 p-[13] w-full" placeholder="Gentag adgangskode" type="password" name="gentagadgangskode" defaultValue={state.values.gentagadgangskode}></input>
                        {state.errors?.gentagadgangskode && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.gentagadgangskode}</p>}
                  
                </div>
                {state.errors?.form && <p  className="bg-[#ff0000] text-white  mb-8">{state.errors.form}</p>}
                <button type="submit" disabled={isPending} className="mx-auto block  rounded-[10px] pt-[13px] pb-[13px] pr-[90px] pl-[90px] bg-white">{isPending ? "Logger ind ..." : "Log ind"}</button>
            </form>
        </main>
    )
}