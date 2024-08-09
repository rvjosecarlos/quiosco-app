import Heading from "@/components/UI/Heading";
import Link from "next/link";

export default function NotFound(){
    return(
        <div className="flex flex-col items-center">
            <Heading>Producto No Encontrado</Heading>
            <Link
                className="bg-amber-500 py-3 px-5 font-bold"
                href={'/admin/products'}
            >
                Ir a productos
            </Link>
        </div>
    )
}