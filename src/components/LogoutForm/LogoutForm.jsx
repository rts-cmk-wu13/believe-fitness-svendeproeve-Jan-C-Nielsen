//"use client"


import { cookies } from "next/headers"
import LogoutAction, { isUserLoggedIn } from "./action"
import Link from "next/link";

export default async function Logout() {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.has("accessToken");

    console.log("isLoggedIn=" + isLoggedIn)

    return (
        <main>
            <form action={LogoutAction}>
                {
                    <button type="submit">
                        Log out
                    </button> 
                }
            </form>

            <Link href="/">Cancel</Link>
        </main>
    )
}
