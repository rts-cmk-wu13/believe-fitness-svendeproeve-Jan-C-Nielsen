"use server"

import { z } from "zod";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const loginSchema = z.object({
    email: z.string().min(1, "Brugernavn min 1 tegn"),
    password: z.string().min(1, "Password min 1 tegn")
})



export async function loginUser(prevState, formData) {

    const cookieStore = await cookies();

    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);
    if (email === prevState.values.email && password === prevState.values.password)
        return prevState;

    //Valider her
    const result = loginSchema.safeParse({ email, password });//zod.dev version 3

    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors);
        return {
            values: { email, password },
            errors: z.flattenError(result.error).fieldErrors

        }

    }

    const response = await fetch("http://localhost:4000/auth/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": email,
                "password": password
            })
        }
    );

    if (!response.ok) {
        return {
            values: {
                email,
                password
            },
            errors: { form: ["Forkert user og/eller password"] }
        }
    }

    const data = await response.json();

    console.log("loginUser data: " , data)
    cookieStore.set("accessToken", data.token);
    cookieStore.set("userid", data.userId);

    return redirect("/")
}
