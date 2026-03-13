"use server"

import { z } from "zod";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const loginSchema = z.object({
    fornavn: z.string().min(2, "Names min 2 chars"),
    email: z.email("Invalid email"),
    adgangskode: z.string().min(4, "Password min 4 chars"),
    gentagadgangskode: z.string().min(4, "Password min 4 chars")
}).refine((data) => data.adgangskode === data.gentagadgangskode, {
    message: "Password does not match",
    path: ["gentagadgangskode"], 
});



export async function loginUser(prevState, formData) {

    const fornavn = formData.get("fornavn");
    const email = formData.get("email");
    const adgangskode = formData.get("adgangskode");
    const gentagadgangskode = formData.get("gentagadgangskode");

    console.log(fornavn);

    if (
        fornavn === prevState.values.fornavn &&
        email === prevState.values.email &&
        adgangskode === prevState.values.adgangskode &&
        gentagadgangskode === prevState.values.gentagadgangskode
    )
        return prevState;

    //Valider her
    const result = loginSchema.safeParse({ fornavn, email, adgangskode, gentagadgangskode });//zod.dev version 3

    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors);
        return {
            values: { fornavn, email, adgangskode, gentagadgangskode },
            errors: z.flattenError(result.error).fieldErrors
        }

    }

    const username = email;
    const [userFirstName, userLastName = ""] = fornavn.split(" ", 2);
console.log("**************",userFirstName, "-----", userLastName)

/* "username": "user42",
  "password": "1234",
  "userFirstName": "Holger",
  "userLastName": "Danske" */

    const response = await fetch("http://localhost:4000/api/v1/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({  "username": email, "password": adgangskode, "userFirstName": userFirstName, "userLastName": userLastName })
        }
    );

    if (!response.ok) {
        return {
            values: {
                fornavn,  adgangskode
            },
            errors: { form: ["Fejl"] }
        }
    }

    const data = await response.json();

    return redirect("/home")

}
