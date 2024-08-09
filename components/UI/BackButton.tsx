"use client"
import { useRouter } from "next/navigation"

export default function BackButton(){
    const router = useRouter();

    return(
        <button
            onClick={()=> router.back()}
            className="bg-amber-500 py-3 px-5 font-bold"
        >
            Atrás
        </button>
    )
}