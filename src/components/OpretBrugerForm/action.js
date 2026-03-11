"use server"

import { z } from "zod";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const loginSchema = z.object({
    fornavn: z.string().min(2, "Fornavn min 2 tegn"),
    efternavn: z.string().min(2, "Efternavn min 2 tegn"),
    brugernavn: z.string().min(2, "Brugernavn min 2 tegn"),
    alder: z.string().min(2, "Alder min 1 tegn"),
    adgangskode: z.string().min(4, "Adgangskode min 4 tegn"),
    gentagadgangskode: z.string().min(4, "Adgangskode min 4 tegn")
})



export async function loginUser(prevState, formData) {

    const fornavn = formData.get("fornavn");
    const efternavn = formData.get("efternavn");
    const brugernavn = formData.get("brugernavn");
    const alder = formData.get("alder");
    const adgangskode = formData.get("adgangskode");
    const gentagadgangskode = formData.get("gentagadgangskode");

    console.log(fornavn, efternavn, brugernavn);

    if (
        fornavn === prevState.values.fornavn && 
        efternavn === prevState.values.efternavn && 
        brugernavn === prevState.values.brugernavn &&
        alder === prevState.values.alder && 
        adgangskode === prevState.values.adgangskode && 
        gentagadgangskode === prevState.values.gentagadgangskode
   )
        return prevState;

    //Valider her
    const result = loginSchema.safeParse({fornavn, efternavn, brugernavn, alder, adgangskode, gentagadgangskode});//zod.dev version 3

    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors);
        return {
            values: {fornavn, efternavn, brugernavn, alder, adgangskode, gentagadgangskode },
            errors: z.flattenError(result.error).fieldErrors
        }

    }

    const response = await fetch("http://localhost:4000/api/v1/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "firstname":fornavn, "lastname":efternavn, "username":brugernavn, "age":alder, "password":adgangskode, "role":"default" })
        }
    );

    if (!response.ok) {
        return {
            values: {
                fornavn, efternavn, brugernavn, alder, adgangskode
            },
            errors: { form: ["Fejl"] }
        }
    }

    const data = await response.json();

    return redirect("/")

}
