"use server"

import { z } from "zod";

import { redirect } from "next/navigation"

const loginSchema = z.object({
    email: z.email("Indtast gyldig email"),

})



export async function loginUser(prevState, formData) {


    const email = formData.get("email");

    console.log(email);
    if (email === prevState.values.email)
        return prevState;

    //Valider her
    const result = loginSchema.safeParse({ email });//zod.dev version 3

    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors);
        return {
            values: { email },
            errors: z.flattenError(result.error).fieldErrors

        }

    }

    const response = await fetch("http://localhost:4000/api/v1/newsletter",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "email": email })
        }
    );

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
