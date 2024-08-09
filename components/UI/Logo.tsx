import Image from "next/image";

export default function Logo(){
    return(
        <div className="flex justify-center mt-5">
            <div className="relative w-40 h-40">
                <Image 
                    fill
                    alt="Logotipo Fresh Coffe"
                    src='/logo.svg'
                    priority
                />
            </div>
        </div>
    )
};