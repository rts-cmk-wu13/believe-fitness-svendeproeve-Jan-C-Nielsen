import Image from "next/image";

import { saveMessage } from "./actions";

export default async function SearchPage() {



    return (
        <div>
            <form
                action={saveMessage}
                className="mx-auto max-w-md  p-6 "
            >
                <div className="relative">
                    <input
                        name="message"
                        placeholder="Søg"
                        className="w-full rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:bg-[#C4C4C4] focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        <Image className=" rounded-[39px_39px_0px_39px]"
                            src="/search.png"
                            alt="Search"
                            width={24}
                            height={24}
                            unoptimized
                        ></Image>
                    </button>
                </div>
            </form>
        </div>
    );
}