
export default function DetSigerVoresKunderOmOsCard({  bodytext, name, occupation }) {


    return (
        <section className="m-[27px]  flex flex-col items-center gap-6">
            <p className="text-center w-[239px] text-white text-[16]">
            {bodytext}  </p>
              <h2 className="  text-[20] text-bold  text-white">
                {name} 
            </h2>
           <small  className="text-[16]  text-white">{occupation}</small>
          
        </section>
    )

}