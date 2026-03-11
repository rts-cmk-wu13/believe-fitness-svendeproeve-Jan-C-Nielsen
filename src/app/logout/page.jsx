//"use client"

import LogoutForm from "../components/LogoutForm/LogoutForm";

export default function logout() {

    return (
        <main className="bg-[#003147] w-[411px] mx-auto flex flex-col items-center justify-center text-white">

            <LogoutForm></LogoutForm>

        </main>
    )
}


/*
export default function LogoutButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    //IIFE imidelit invoked function expression
    useEffect(function () {
        (async function () {
            setIsLoggedIn(await isUserLoggedIn())
        })()
    }, [])

console.log("isLoggedIn="+isLoggedIn)

    return isLoggedIn ?
        <button onClick={LogoutAction}>
            Log out
        </button> : null;

}*/
//se videon