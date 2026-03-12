"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function LogoutAction(params) {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("userid");

    return redirect("/home")

}


export async function isUserLoggedIn() {
    const cookieStore = await cookies();
    return cookieStore.has("accessToken");
}