"use server"

import { z } from "zod";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const loginSchema = z.object({
    navn: z.string().min(2, "Navn min 2 tegn"),
    email: z.email("Indtast gyldig email"),
    besked: z.string().min(1, "Besked min 1 tegn")
})



export async function loginUser(prevState, formData) {

    const email = formData.get("email");
    const navn = formData.get("navn");
    const besked = formData.get("besked");

    console.log(email, navn, besked);
    if (email === prevState.values.email && navn === prevState.values.navn && besked === prevState.values.besked)
        return prevState;

    //Valider her
    const result = loginSchema.safeParse({navn, email, besked });//zod.dev version 3

    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors);
        return {
            values: {navn, email, besked },
            errors: z.flattenError(result.error).fieldErrors
        }

    }

    const response = await fetch("http://localhost:4000/api/v1/messages",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": navn,  "email": email,  "message": besked })
        }
    );

    if (!response.ok) {
        return {
            values: {
                navn, email, besked
            },
            errors: { form: ["Fejl"] }
        }
    }

    const data = await response.json();

    return redirect("/")

}
