"use server"

import { z } from "zod";

import { redirect } from "next/navigation"

const loginSchema = z.object({
    email: z.email("Indtast gyldig email"),

})



export async function KaruselAction(prevState, formData) {


 
    console.log("response.ok" + response.ok)

    if (!response.ok) {
        return {
            values: {
                email

            },
            errors: { form: ["Forkert email"] }
        }
    }

    const data = await response.json();
    console.log(data)

    return redirect("/")

}
