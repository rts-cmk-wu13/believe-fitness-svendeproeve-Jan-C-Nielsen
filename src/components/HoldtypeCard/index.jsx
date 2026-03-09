import Image from "next/image";

export default function HoldtypeCard({ headline, pic, bodytext }) {


    return (
        <section className="m-[27px] flex flex-col gap-6  sm:items-start sm:text-left">
            <h2 className=" max-w-xs text-[24px]  text-white">
                {headline} 
            </h2>
            <Image
                src={pic}
                alt={pic}
              fill
              unoptimized
            />
            <p className="max-w-md text-[18px]  text-white leading-8">
                {bodytext}  </p>
        </section>
    )

}