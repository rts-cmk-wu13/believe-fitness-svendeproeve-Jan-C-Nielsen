import { cookies } from "next/headers"
import LogoutAction from "./action"
import Link from "next/link";

export default async function Logout() {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.has("accessToken");

    console.log("isLoggedIn=" + isLoggedIn)

    return (
        <main className="mx-auto flex items-center justify-center flex-col min-h-screen w-full bg-white">
            <form 
                className="border bg-[#F1C40E] w-full rounded-full pt-[13px] pb-[13px] pr-[90px] pl-[90px] mb-[10px] text-black text-center"
                action={LogoutAction}
            >
                <button type="submit" className="w-full text-center">
                    Log out
                </button>
            </form>

            <Link
                className="border bg-[#F1C40E] w-full rounded-full pt-[13px] pb-[13px] pr-[90px] pl-[90px] mb-[10px] text-black text-center block"
                href="/home"
            >
                Cancel
            </Link>
        </main>
    )
}